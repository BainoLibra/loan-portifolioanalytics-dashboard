import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const rows = await query(
      `SELECT u.id AS user_id, u.username, u.password_hash, u.officer_id,
              r.id AS role_id, r.name AS role_name,
              o.branch_id
       FROM users u
       JOIN roles r ON r.id = u.role_id
       LEFT JOIN officers o ON o.id = u.officer_id
       WHERE u.username = ?`,
      [username],
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.user_id,
        username: user.username,
        roleId: user.role_id,
        roleName: user.role_name,
        officerId: user.officer_id,
        branchId: user.branch_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
    );

    res.json({
      token,
      user: {
        id: user.user_id,
        username: user.username,
        roleName: user.role_name,
        officerId: user.officer_id,
        branchId: user.branch_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to process login' });
  }
};
