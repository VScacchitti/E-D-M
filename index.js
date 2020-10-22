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
        message: "What would you like to do?",
        choices: [
          "View all Employees", 
          "View all Departments",
        "View All Employees by Department", 
        "View all Employees by Manager", 
        "Add Employee",
        "Add Department",
        "Remove Employee",
        "Update Employee Role", 
        "Update Employee Manager",
        "View all Roles",
        "Ouit"],
      })
      .then(function(answer) {

        console.log(answer.options);

        switch(answers.options) {
          //switch statement to take care of choice logic
          case "View All Employees":
            showEmployees();
            break;

          case "View all Departments" :
            showDepartments();
            break;
          
          case "View All Employees by Department" :
            showEmploybyDepart();
            break;

          case "View All Employees by Manager" :
            showEmploybyManager();
            break;

          case "Add Employee" :
            addEmployee();
            break;

          case "Add Department" :
            addDepartment();
            break;

            case "Remove Employee" :
              removeEmployee();
              break;
            
            case "Update Employee Role" :
              updateEmployRole();
              break;
            
            case "Update Employee Manager" :
              updateEmployManager();
              break;

              case "View All Roles" :
                showRoles();
                break;

                default : connection.end();
                break;        
        }      
      });
  }
//displays all from apartment
 function showDepartments(){

  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(err);
    console.table(res)
    menu();
  })

 };

 function showRoles(){
   connection.query("SELECT * FROM role", function (err, res){
     if (err) throw err;
     console.log(err);
     console.table(res)
     menu();
   })

 };

 function showEmployees(){
   connection.query("SELECT * FROM employee", function (err, res){
     if (err) throw err;
     console.log(err);
     console.table(res)
     menu();
   })
   

 };

function showEmploybyDepart (){
   connection.query("SELECT * FROM employee", function (err, res){
    if (err) throw err;
    console.log(err);
    console.table(res)
    menu();
  })
  
};

function showEmploybyManager(){
  connection.query("SELECT * FROM employee", function (err, res){
    if (err) throw err;
    console.log(err);
    console.table(res)
    menu();
  })
};

function addEmployee(){
  //prompts for new employee info
  inquirer.prompt([{

    type: "input",
    name: "firstName",
    message: "What is the employee's first name?"

  },
  {
    type: "input",
    name: "lastName",
    message:"What is the employee's last name?"
  },
   {
     type: "number",
     name:"roleId",
     message:"What is the employee's role ID?"
   },
   {
     type: "number",
     name:"managerid",
     message: "What is the employee's manager ID?"
   }
]).then( function (res){
  connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)", [res.firstName, res.LastName, res.roleID, res.managerID], function (err, data){
    if (err) throw err;
    console.table("Employee Sucessfully Added");
    menu();
  })
})
};

function addDepartment () {
  inquirer.prompt([{

    type: "input",
    name: "department",
    message: "What kind of department would you like to add?"

  },
]).then( function (res){
  connection.query("INSERT INTO department (name) VALUES(?)", [res.department], function (err, data){
    if (err) throw err;
    console.table("Department Sucessfully Added");
    menu();
  })
})
};

function updateEmployRole(){

  inquirer.prompt([{

    type: "input",
    name: "name",
    message: "Which Employee would like to update?(Use last name)"

  },
  {
    type:"number",
    name: "role_id",
    message: "Please enter department ID."
  }
]).then( function (res){
  connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [res.role_id, res.name], function (err, data){
    if (err) throw err;
    console.table(data)
    console.table("Employee Sucessfully Updated");
    
  })
  menu();
})
  
}

function updateEmployManager () {

  inquirer.prompt([{

    type: "input",
    name: "name",
    message: "Which Employee would like to update?(Use last name)"

  },
  {
    type:"number",
    name: "manager_id",
    message: "Please enter manager ID."
  }
]).then( function (res){
  connection.query("UPDATE employee SET manager_id = ? WHERE last_name = ?", [res.manager_id, res.name], function (err, data){
    if (err) throw err;
    console.table(data)
    console.table("Employee Sucessfully Updated");
    
  })
  menu();
})

}

function removeEmployee(){
  
}
  
