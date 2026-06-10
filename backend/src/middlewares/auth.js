import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const rows = await query(
      `SELECT u.id AS user_id, u.username, r.name AS role_name, o.branch_id, u.officer_id
       FROM users u
       JOIN roles r ON r.id = u.role_id
       LEFT JOIN officers o ON o.id = u.officer_id
       WHERE u.id = ?`,
      [payload.userId],
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' });
    }

    req.user = {
      id: user.user_id,
      username: user.username,
      roleName: user.role_name,
      officerId: user.officer_id,
      branchId: user.branch_id,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roleName)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
