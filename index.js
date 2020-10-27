const inquirer = require("inquirer");
const dbmanage = require("./dbManage");

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
    menu();
  });
//menu function 
  function menu() {
    inquirer
      .prompt({
        name: "name",
        type: "list",
        message: "Welcome to the Employee Database",
        choices: [
          "View all Departments", 
          "View all Roles",
          "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Remove a Department",
        "Remove a Role",
        "Remove an Employee",
        "Update Employee Role", 
        "Update Employee Manager",
        "Quit"
        ],
      })
      .then((response) => {

        console.log(response);

        switch (response.name) {
          default:
            text = "Something went wrong!";
            break;

          case "View all Departments" :
            dbManage.showDepartments(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "View all Roles" :
            dbManage.showRoles(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "View all Employees" :
            dbManage.showEmployees(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Add a Department" :
            dbManage.addDepartment(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Add a Role" :
            dbManage.addRole(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Add an Employee" :
            dbManage.addEmployee(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Remove a Department" :
            dbManage.removeDepartment(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Remove a Role" :
            dbManage.removeRole(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Remove an Employeet" :
            dbManage.removeEmployee(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Update Employee Role" :
            dbManage.updateRole(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Update Employee Manager" :
            dbManage.updateManager(function () {
              //Brings the menu back up
              menu();
            });
          break;

          case "Quit" :
            dbManage.quit(function () {
              
              process.exit();
            });
          break;


        }
      });
    };

    menu();

    
  
  
