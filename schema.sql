-- SQL Schema for XYZ Company
CREATE DATABASE eds;

USE eds;

-- Creating Employees Table
CREATE TABLE Employees (
    employee_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(45) NOT NULL,
    department VARCHAR(45) NOT NULL,
    date_joined DATE
);

-- Creating Contacts Table
CREATE TABLE Contacts (
    contact_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100) NOT NULL,
    address3 VARCHAR(100) NOT NULL,
    mobile_phone INT,
    home_phone INT,
    office_phone VARCHAR(45) NOT NULL,
    office_did INT,
    personal_email VARCHAR(255) DEFAULT '',
    company_email VARCHAR(255) NOT NULL,
    employee_id INT UNSIGNED,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

-- Creating Supervisors Table
CREATE TABLE Supervisors (
    supervisor_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Creating Taskforces Table
CREATE TABLE Taskforces (
    taskforce_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    taskforce_name TEXT
);

-- Creating EmployeeSupervisor Table
CREATE TABLE EmployeeSupervisor (
    employee_supervisor_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id INT UNSIGNED,
    supervisor_id INT UNSIGNED,
    ranking TEXT,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
    FOREIGN KEY (supervisor_id) REFERENCES Supervisors(supervisor_id)
);

-- Creating EmployeeTaskforce Table
CREATE TABLE EmployeeTaskforce (
    employee_taskforce_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id INT UNSIGNED,
    taskforce_id INT UNSIGNED,
    role VARCHAR(45) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
    FOREIGN KEY (taskforce_id) REFERENCES Taskforces(taskforce_id)
);
