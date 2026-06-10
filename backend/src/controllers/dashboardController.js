import { pool } from '../config/db.js';

const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

export const getSummary = async (req, res) => {
  try {
    const [lent] = await query('SELECT COALESCE(SUM(principal), 0) AS total_lent FROM loans WHERE status IN ("active", "late", "defaulted")');
    const [outstanding] = await query('SELECT COALESCE(SUM(outstanding_amount), 0) AS total_outstanding FROM loans WHERE status IN ("active", "late", "defaulted")');
    const [defaultCount] = await query('SELECT COUNT(*) AS defaults FROM loans WHERE status = "defaulted"');
    res.json({
      totalLent: Number(lent.total_lent),
      outstanding: Number(outstanding.total_outstanding),
      defaultCount: Number(defaultCount.defaults),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load summary' });
  }
};

export const getDefaultingClients = async (req, res) => {
  try {
    const rows = await query(
      `SELECT c.id, c.name, b.name AS branch, l.id AS loan_id, l.outstanding_amount, l.status
       FROM loans l
       JOIN clients c ON c.id = l.client_id
       JOIN branches b ON b.id = l.branch_id
       WHERE l.status = 'defaulted'
       ORDER BY l.outstanding_amount DESC
       LIMIT 20`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load defaulting clients' });
  }
};

export const getTopOfficers = async (req, res) => {
  try {
    const rows = await query(
      `SELECT o.id, o.name, b.name AS branch,
              COUNT(l.id) AS loan_count,
              COALESCE(SUM(l.principal), 0) AS volume,
              COALESCE(SUM(l.outstanding_amount), 0) AS outstanding
       FROM loans l
       JOIN officers o ON o.id = l.officer_id
       JOIN branches b ON b.id = o.branch_id
       WHERE l.status IN ('active', 'late', 'defaulted')
       GROUP BY o.id
       ORDER BY volume DESC
       LIMIT 10`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load top officers' });
  }
};

export const getBranchGrowth = async (req, res) => {
  try {
    const rows = await query(
      `SELECT b.id, b.name,
              MONTH(l.disbursed_date) AS month,
              YEAR(l.disbursed_date) AS year,
              COALESCE(SUM(l.principal), 0) AS disbursed
       FROM loans l
       JOIN branches b ON b.id = l.branch_id
       WHERE l.disbursed_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
       GROUP BY b.id, year, month
       ORDER BY year, month`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load branch growth' });
  }
};

export const getPortfolioAtRisk = async (req, res) => {
  try {
    const rows = await query(
      `SELECT
        SUM(CASE WHEN l.status IN ('late', 'defaulted') THEN l.outstanding_amount ELSE 0 END) AS par_amount,
        SUM(l.outstanding_amount) AS total_outstanding
       FROM loans l
       WHERE l.status IN ('active', 'late', 'defaulted')`);

    const parAmount = Number(rows[0].par_amount);
    const totalOutstanding = Number(rows[0].total_outstanding);
    const parRatio = totalOutstanding > 0 ? Number(((parAmount / totalOutstanding) * 100).toFixed(2)) : 0;

    res.json({ parAmount, totalOutstanding, parRatio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load PAR' });
  }
};
