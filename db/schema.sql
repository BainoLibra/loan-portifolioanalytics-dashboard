-- Loan Portfolio Analytics Database Schema

CREATE DATABASE IF NOT EXISTS loan_portfolio;
USE loan_portfolio;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE branches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(150),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE officers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  branch_id INT,
  role_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  gender VARCHAR(10),
  occupation VARCHAR(100),
  branch_id INT,
  status ENUM('active','inactive','delinquent') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE loan_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL
);

CREATE TABLE loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  officer_id INT NOT NULL,
  branch_id INT NOT NULL,
  product_id INT NOT NULL,
  principal DECIMAL(14,2) NOT NULL,
  interest_rate DECIMAL(5,2) DEFAULT 2.00,
  term_months INT,
  disbursed_date DATE NOT NULL,
  due_date DATE NOT NULL,
  outstanding_amount DECIMAL(14,2) NOT NULL,
  status ENUM('active','late','defaulted','closed') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (officer_id) REFERENCES officers(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (product_id) REFERENCES loan_products(id)
);

CREATE TABLE repayments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loan_id INT NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  repayment_date DATE NOT NULL,
  payment_method ENUM('Cash','Bank','Mobile Money') DEFAULT 'Cash',
  status ENUM('posted','pending','failed') DEFAULT 'posted',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (loan_id) REFERENCES loans(id)
);

CREATE TABLE loan_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loan_id INT NOT NULL,
  due_date DATE NOT NULL,
  amount_due DECIMAL(14,2) NOT NULL,
  amount_paid DECIMAL(14,2) DEFAULT 0,
  status ENUM('scheduled','paid','missed') DEFAULT 'scheduled',
  FOREIGN KEY (loan_id) REFERENCES loans(id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  officer_id INT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (officer_id) REFERENCES officers(id)
);

INSERT INTO roles (name) VALUES ('Admin'), ('Branch Manager'), ('Loan Officer'), ('Auditor');
