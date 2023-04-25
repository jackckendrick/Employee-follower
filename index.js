const inquirer = require ('inquirer');
const fs = require ('fs');
const mysql = require ('mysql2');
const { type } = require('os');
require("console.table")

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Dawn1kevin',
    database: 'employee_db'
})

function firstQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add a role', 'View all departments', 'Quit'],
            name: 'question_1'
        },
    ])
    .then(answer => {
        if(answer.action === "View all employees"){
            viewEmployees()
        } 
        else if(answerr.action === "Add employee"){
            addEmployee()
        }
        else if(answer.action === "Update employee role"){
            updateEmployeeRole()
        }
        else if(answer.action === "View all roles"){
            viewRoles()
        }
        else if(answer.action === "Add a role"){
            addRole()
        }
        else if(answer.action === "View all departments"){
            viewDepartments()
        }
        else if(answer.action === "Quit"){
            quit()
        }
    })
}

function viewEmployees() {
    db.query("SELECT * FROM employee", (err, results) =>{
        if(err) {
            console.log(err)
        } else {
            console.table(results)
        }
    } )
}

function addEmployee() {
    inquirer.prompt([
       {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name"
       },
       {
        type: "input",
        message: "What si the employee's last name?",
        name: "last_name" 
       },
       {
        type: "input",
        message: "What is the employee's role id?",
        name: "role_id"
       },
       {
        type: "input",
        message: "What is the employee's manager id?",
        name: "manager_id"
       }
    ])
    .then(answers => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role_id});`, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Employee has been added!")
            }
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's new role id?",
            name: "role_id"
        }
    ])
    .then(answers => {
        db.query(`UPDATE employee SET role_id = ${answers.role_id} WHERE first_name =${answers.first_name}`, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Employee has been updated!")
            }
        })
    })
}

function viewRoles() { 
    db.query("SELECT * FROM role", (err, results) =>{
    if(err) {
        console.log(err)
    } else {
        console.table(results)
    }
} )
}

function addRole() {
    inquirer.prompt([
       {
        type: "input",
        message: "What is the role title?",
        name: "role_title"
       },
       {
        type: "input",
        message: "What is the role's salary?",
        name: "salary" 
       },
       {
        type: "input",
        message: "What department is the role in?",
        name: "department"
       }
    ])
    .then(answers => {
        db.query(`INSERT INTO role (role_title, salary, department) VALUES ("${answers.role_title}", "${answers.salary}", ${answers.department});`, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Role has been added!")
            }
        })
    })
}

function viewDepartments() {
    db.query("SELECT * FROM department", (err, results) =>{
        if(err) {
            console.log(err)
        } else {
            console.table(results)
        }
    } )
}

function quit() {
    console.log("Goodbye!")
    process.exit()
}