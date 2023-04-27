DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    -- FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    -- FOREIGN KEY (manager_id) REFERENCES employee(id)
    -- FOREIGN KEY (role_id) REFERENCES role(id),
);

INSERT INTO department (id, department_name)
VALUES (1, "Engineering"), (2, "Legal"), (3, "Service"), (4, "Finance"), (5, "Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("L1", 100000, 1), ("L2", 150000, 1), ("L3", 200000, 1), ("Counsel", 210000, 2), ("paralegal", 90000, 2), ("janitor", 50000, 3), ("security", 70000, 3), ("Accountant 1", 60000, 4), ("Accountant 2", 80000, 4), ("CFO", 450000, 4), ("Account executive", 120000, 5), ("Sales representative", 85000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Kendrick", 4, 3), ("Lisa", "Thomas", 2, 7), ("Jane", "Doe", 3, 5), ("John", "Smith", 1, 5), ("Steve", "Jackson", 6, 2), ("Allison", "Perry", 6, 2), ("Jim", "Cook", 3, 1), ("Alex", "Kim", 5, 2), ("Tim,", "Roberts", 4, 4), ("Ryan", "Sartin", 3, 1), ("Tom", "Nordan", 4, 6), ("Lily", "Ho", 5, 2), ("Anne", "Strait", 3, 7), ("Kim", "Kardashian", 3, 9), ("Khloe", "Thompson", 5, 11), ("Todd", "Chrisley", 7, 3), ("Kenya", "Moore", 3, 8), ("Kandi", "Burrus", 2, 11), ("Kathy", "Hilton", 6, 12);
