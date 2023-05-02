const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const { type } = require("os");
// require("console.table")

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Dawn1kevin",
  database: "employee_db",
});

function firstQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee role",
          "View all roles",
          "Add a role",
          "View all departments",
          "Add department",
          "Quit",
        ],
        name: "question_1",
      },
    ])
    .then((answer) => {
      if (answer.question_1 === "View all employees") {
        viewEmployees();
      } else if (answer.question_1 === "Add employee") {
        addEmployee();
      } else if (answer.question_1 === "Update employee role") {
        updateEmployeeRole();
      } else if (answer.question_1 === "View all roles") {
        viewRoles();
      } else if (answer.question_1 === "Add a role") {
        addRole();
      } else if (answer.question_1 === "View all departments") {
        viewDepartments();
      } else if (answer.question_1 === "Add department") {
        addDepartment();
      } else {
        quit();
      }
    });
}

function viewEmployees() {
  db.promise()
    .query("SELECT * FROM employee")
    .then(([rows]) => {
      console.table(rows);
      firstQuestion();
    })
    .catch((err) => console.log(err));
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role id?",
        choices: [
          "L1",
          "L2",
          "L3",
          "Counsel",
          "Paralegal",
          "Janitor",
          "Security",
          "Accountant 1",
          "Accountant 2",
          "CFO",
          "Account Executive",
          "Sales Representative",
        ],
        name: "role_id",
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: ["Anne", "Tom", "Kathy", "Kenya", "Josh", "John"],
        name: "manager_id",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role_id}, ${answers.manager_id});`,
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Employee has been added!");
          }
        }
      );
    });
  firstQuestion();
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's new role id?",
        name: "role_id",
      },
    ])
    .then((answers) => {
      db.query(
        `UPDATE employee SET role_id = ${answers.role_id} WHERE first_name =${answers.first_name}`,
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Employee has been updated!");
          }
        }
      );
    });
  firstQuestion();
}

function viewRoles() {
  db.promise()
    .query(
      "SELECT role.id, role.title AS Title, role.salary AS Salary, department.department_name AS Department FROM role LEFT JOIN department ON role.department_id = department.id"
    )
    .then(([rows]) => {
      console.table(rows);
      firstQuestion();
    })
    .catch((err) => console.log(err));
}

async function addRole() {
    const [departments] = await db.promise().query("SELECT * FROM department")
    const departmentsArray = departments.map(department => (
        {name: department.department_name,value: department.id}
    ))
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role title?",
        name: "role_title",
      },
      {
        type: "input",
        message: "What is the role's salary?",
        name: "salary",
      },
      {
        type: "list",
        message: "What department is the role in?",
        name: "department",
        choices: departmentsArray
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ("${answers.role_title}", "${answers.salary}", ${answers.department});`,
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Role has been added!");
          }
        }
      );
    });
//   firstQuestion();
}

function viewDepartments() {
  db.promise()
    .query("SELECT * FROM department")
    .then(([rows]) => {
      console.table(rows);
      firstQuestion();
    })
    .catch((err) => console.log(err));
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "department_name",
    message: "Enter department name",
  }).then(({department_name})=> {
    db.promise().query("INSERT INTO department SET ?",{department_name})
    .then(([rows])=> {
        if(rows.affectedRows>0){
            viewDepartments();
        }
        else{
            console.error("Failed to add department")
            firstQuestion();
        }
    })
  })
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

firstQuestion();
