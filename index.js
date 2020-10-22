const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const conTable = require("console.table");



var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "test_user",
  
    // Your password
    password: "password",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.end();
    start();
  });

  function menu() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "Please choose an option.",
        choices: ["View all Department", "Add a Department", "Delete a Department", "View all Roles", "Add a Role","Delete a Role","View all Employees", "Add an Employee", "Delete an Employee","Update Employee Role","Update Employee Manager","Show Employee by Department","Ouit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
       
      });
  }

 function showDepartments(){

  connection.query("SELECT * FROM department", (err,res)=> {
    if (err) throw err;

    if (res.length > 0 ) {
      console.log("\n")
      console.log("-- Departments --")
      console.log("\n")
      console.table(res);
    }
    
  })
 };

 function showRoles(){

  connection.query("SELECT role.title AS job_title, role.id, department..name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id=department.id", (err,res)=> {
    if (err) throw err;

    if (res.length > 0 ) {
      console.log("\n")
      console.log("-- Roles --")
      console.log("\n")
      console.table(res);
    }
    
  })



  
 };

 function showEmployees(){

   





 };
å




  function addDepartmnet() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "Please choose an option.",
        choices: ["View all Department", "Add a Department", "Delete a Department", "View all Roles", "Add a Role","Delete a Role","View all Employees", "Add an Employee", "Delete an Employee","Update Employee Role","Update Employee Manager","Show Employee by Department","Ouit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
       
      });
  }

  function addRole() {}

  function addEmployee(){

  }

  function deleteDepartment(){};
  function deleteRole() {}