const mysql = require("mysql");
const inquirer = require("inquirer");
const conTable = require("console.table");

// connects to mysql, and logs if you are connected
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    //username
    user: "test_user",
  
    // password and database
    password: "password",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.end();
    start();
  });
//menu function 
  function menu() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "Please choose an option.",
        choices: ["View all Department", "Add a Department", "Delete a Department", "View all Roles", "Add a Role","Delete a Role","View all Employees", "Add an Employee", "Delete an Employee","Update Employee Role","Update Employee Manager","Show Employee by Department","Ouit"]
      })
      .then(function(answer) {

       
      });
  }
//displays all from apartment
 function showDepartments(){

  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(err);
    console.table(res)
  })


 };

 function showRoles(){
   connection.query("SELECT * FROM role", function (err, res){
     if (err) throw err;
     console.log(err);
     console.table(res)
   })

 };

 function showEmployees(){
   connection.query("SELECT * FROM employee", function (err, res){
     if (err) throw err;
     console.log(err);
     console.table(res)
   })
   

 };

  async function selectEmployee () {


  
};




  function addDepartmnet() {
    
  }

  function addRole() {}

  function addEmployee(){

  }

  function deleteDepartment(){};
  function deleteRole() {}