-- Sample INSERT Statements for XYZ Company Schema
use eds;

-- Inserting data into Employees
INSERT INTO Employees (name, designation, department, date_joined) VALUES
('Tan Ah Kow', 'IT Manager', 'MIS', '2005-08-21'),
('Jon Tan', 'VP', 'RnD', '1994-04-11'),
('Alex Chua', 'Product Manager', 'RnD', '2007-03-12'),
('Andrew Ng', 'Engineer', 'RnD', '1994-07-22'),
('Ang Chwee Eng', 'Senior Product Engineer', 'RnD', '2013-09-12');

-- Inserting data into Contacts
INSERT INTO Contacts (address1, address2, address3, mobile_phone, home_phone, office_phone, office_did, personal_email, company_email, employee_id) VALUES
('Block 118 #03-51', 'Yishun Street 17', 'Singapore 520118', 81123456, 63827908, '62779015 Ext 331', 62779331, 'tanak@gmail.com.sg', 'tanahkow@xyz.com', 1),
('Block 165 #02-190', 'Woodlands Drive 70', 'Singapore 730165', 92241290, 63331988, '62779015 Ext 237', 62779237, 'jt1199@yahoo.com', 'jontan@xyz.com', 2),
('Block 911 #11-55', 'Pasir Ris Avenue 5', 'Singapore 203911', 88813756, 62907771, '62779015 Ext 190', 62779190, 'alexchua10@gmail.com', 'alexchua@xyz.com', 3),
('Block A #06-51', 'Casa Blanca', 'Singapore 730124', 81811355, 63229856, '62779015 Ext 235', 62779235, 'andyng909@yahoo.com', 'andrewng@xyz.com', 4),
('Block 713 #03-61', 'Pasir Ris Avenue 10', 'Singapore 203713', 92209220, 63221093, '62779015 Ext 220', 62779220, 'freddyang@gmail.com', 'angchweeeng@xyz.com', 5);

-- Inserting data into Supervisors
INSERT INTO Supervisors (name) VALUES
('Jon Tan'),
('Alex Chua');

-- Inserting data into EmployeeSupervisor
INSERT INTO EmployeeSupervisor (employee_id, supervisor_id, ranking) VALUES
(4, 1, 'A+'),
(1, 1, 'B'),
(2, NULL, NULL),
(3, 1, 'A'),
(5, 2, 'A');

-- Inserting data into Taskforces
INSERT INTO Taskforces (taskforce_name) VALUES
('alpha-team');

-- Inserting data into EmployeeTaskforce
INSERT INTO EmployeeTaskforce (employee_id, taskforce_id, role) VALUES
(1, 1, 'chairman'),
(2, 1, 'treasurer'),
(3, 1, 'secretary'),
(4, 1, 'member'),
(5, 1, 'member');