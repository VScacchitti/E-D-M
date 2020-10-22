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
    menu();
  });
//menu function 
  function menu() {
    inquirer
      .prompt({
        name: "name",
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
        "View all Roles"],
      })
      .then((val) => {

        console.log(val.name);

        if (val.name === "View all Employees") {
          showEmployees();
        } else if (val.name === "View all Departments") {
          showDepartments();
        } else if (val.name === "View All Employees by Department") {
          showEmploybyDepart();
        } else if (val.name === "View all Employees by Manager") {
          showEmploybyManager();
        } else if (val.name === "Add Employee") {
          addEmployee();
        } else if (val.name === "Add Department") {
          addDepartment();
        } else if (val.name === "Remove Employee") {
          removeEmployee();
        } else if (val.name === "Update Employee Role") {
          updateEmployRole();
        }  else if (val.name === "Update Employee Manager") {
          updateEmployManager();
        } else if (val.name === "View All Rolesr") {
          showRoles();
         } else {
          connection.end();
        }
      });
  }
//displays all from apartment
 function showDepartments(){

  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(err);
    console.table(res)
    
  })
  menu();

 };

 function showRoles(){
   connection.query("SELECT * FROM role", function (err, res){
     if (err) throw err;
     console.log(err);
     console.table(res)
    
   })
   menu();
 };

 function showEmployees(){
   connection.query("SELECT * FROM employee", function (err, res) {
     if (err) throw err;
     console.log(err);
     console.table(res)
     menu();
   })
   

 };

function showEmploybyDepart (){
   connection.query("SELECT * FROM department GROUP BY department ORDER BY department", function (err, res){
    if (err) throw err;
    console.log(err);
    console.table(res)
    menu();
  })
  
};

function showEmploybyManager(){
  connection.query("SELECT * FROM employee GROUP BY manager_id ORDER BY manager_id ", function (err, res){
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
    name: "first_name",
    message: "What is the employee's first name?"

  },
  {
    type: "input",
    name: "last_name",
    message:"What is the employee's last name?"
  },
   {
     type: "number",
     name:"role_id",
     message:"What is the employee's role ID?"
   },
   {
     type: "number",
     name:"manager_id",
     message: "What is the employee's manager ID?"
   }
]).then( function (res){
  connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [res.first_name, res.last_name, res.role_id, res.manager_id], function (err, data){
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

  return inquirer.prompt([{

    type: "input",
    name: "name",
    message: "Which Employee would like to remove?(Use last name)"

  },
]).then( function (res){
  connection.query("DELETE FROM employee WHERE last_name = ?", [res.name], function (err, data){
    if (err) throw err;
    console.table(data)
    console.table("Employee Sucessfully Removed");
    
  })
  menu();
})

};
  
