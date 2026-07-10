USE loan_portfolio;
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

-- =========================================
-- OFFICERS
-- =========================================

INSERT INTO officers (name, email, branch_id, role_id)
VALUES
('John Ssemanda',      'john.ssemanda@loanportfolio.com',      1, 3),
('Sarah Namutebi',     'sarah.namutebi@loanportfolio.com',     1, 3),

('Peter Mugisha',      'peter.mugisha@loanportfolio.com',      2, 3),
('Grace Atuhaire',     'grace.atuhaire@loanportfolio.com',     2, 3),

('David Kato',         'david.kato@loanportfolio.com',         3, 3),
('Annet Nankya',       'annet.nankya@loanportfolio.com',       3, 3),

('Brian Tumwesigye',   'brian.tumwesigye@loanportfolio.com',   4, 3),
('Irene Achan',        'irene.achan@loanportfolio.com',        4, 3),

('Ronald Ssekandi',    'ronald.ssekandi@loanportfolio.com',    5, 3),
('Doreen Nakato',      'doreen.nakato@loanportfolio.com',      5, 3),

('James Byaruhanga',   'james.byaruhanga@loanportfolio.com',   6, 3),
('Mary Tusiime',       'mary.tusiime@loanportfolio.com',       6, 3),

('Joseph Arinaitwe',   'joseph.arinaitwe@loanportfolio.com',   7, 3),
('Harriet Ampaire',    'harriet.ampaire@loanportfolio.com',    7, 3),

('Isaac Mwesigwa',     'isaac.mwesigwa@loanportfolio.com',     8, 3),
('Patricia Twinomujuni','patricia.twinomujuni@loanportfolio.com',8,3),

('Richard Walusimbi',  'richard.walusimbi@loanportfolio.com',  9, 3),
('Stella Nabirye',     'stella.nabirye@loanportfolio.com',     9, 3),

('Michael Kiiza',      'michael.kiiza@loanportfolio.com',      10, 3),
('Rebecca Namugenyi',  'rebecca.namugenyi@loanportfolio.com',  10, 3);

-- =========================================
-- CLIENTS - LUGAZI BRANCH
-- =========================================

INSERT INTO clients
(name, national_id, email, phone, gender, date_of_birth, occupation, address, branch_id, officer_id, status)
VALUES
('Alice Namubiru','CM9600112345AB','alice.namubiru@email.com','0701000001','Female','1996-05-12','Retail Trader','Lugazi Town',1,1,'active'),

('Peter Sserwanga','CF9200212345CD','peter.sserwanga@email.com','0701000002','Male','1992-08-19','Farmer','Najjembe',1,1,'active'),

('Sarah Nantongo','CM9800312345EF','sarah.nantongo@email.com','0701000003','Female','1998-11-02','Teacher','Lugazi',1,1,'active'),

('James Kato','CF9000412345GH','james.kato@email.com','0701000004','Male','1990-03-28','Mechanic','Lugazi',1,2,'active'),

('Rebecca Nankya','CM9500512345IJ','rebecca.nankya@email.com','0701000005','Female','1995-07-10','Tailor','Lugazi',1,2,'delinquent');