USE loan_portfolio;

-- ======================================
-- ROLES
-- ======================================

INSERT INTO roles (name)
VALUES
('Admin'),
('Branch Manager'),
('Loan Officer'),
('Auditor');

-- ======================================
-- LOAN PRODUCTS
-- ======================================

INSERT INTO loan_products (name, interest_rate)
VALUES
('Business Loan',2.50),
('Agriculture Loan',2.00),
('School Fees Loan',1.80),
('Salary Loan',1.50),
('Emergency Loan',3.00),
('Asset Financing',2.20);

-- ======================================
-- BRANCHES
-- ======================================

INSERT INTO branches(name,location)
VALUES
('Lugazi Branch','Lugazi'),
('Mukono Branch','Mukono'),
('Ntinda Branch','Kampala'),
('Nakulabye Branch','Kampala'),
('Kasaga Branch','Kampala'),
('Mbarara Branch','Mbarara'),
('Ntungamo Branch','Ntungamo'),
('Kabale Branch','Kabale'),
('Jinja 1 Branch','Jinja'),
('Jinja 2 Branch','Jinja');