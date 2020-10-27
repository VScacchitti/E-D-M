const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();
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

//-------------------------------------------------------
//  Functions to show department, role, and employee
//-------------------------------------------------------

// Show Departments
 showDepartments = (showDepartmentCB) => {

  connection.query("SELECT * FROM department", function (err, res) {
    if (err){
      console.log(err);
    } else {
      console.log("\n")
      console.log("-- Departments --")
      console.log('\n')
      console.table(res);
    }
    showDepartmentCB(err,res);   
  })
 };

 //SHow Roles
showRoles = (showRolesCB) => {
    connection.query("SELECT * FROM role INNER JOIN department ON role.department_id = department.id", function (err, res) {
      if (err) {
        console.log(err);
      } else {

        console.log("\n")
        console.log("-- Roles --")
        console.log('\n')
        console.table(res);
      }
      showRolesCB(err,res);
    })
   
  };
 
 // show employees
showEmployees = (showEmployeeCB) => {
    connection.query('SELECT * FROM employee INNER JOIN	role ON employee.roleId = role.id INNER JOIN department ON role.departmentId = department.id', function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("\n")
        console.log("-- Employees --")
        console.log('\n')
        console.table(res);

      }
     
      showEmployeeCB(err,res);
    })
    
  };

//-------------------------------------------------------
//  Functions to add department, role, and employee
//-------------------------------------------------------

//Add a New Employee
addEmployee =(addEmployeeCB) => {
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

  let data = {
    first_name: res.first_name,
    last_name: res.last_name,
    role_id: res.role_id
  }
  if (res.manager_id){
    data.manager_id = res.manager_id
  }
  connection.query("INSERT INTO employee SET ?", data, function (err, res) {
    console.log(err);
    console.log(`${res.first_name} ${res.last_name}'s profile was created successfully!`);
  // Displays employees
  showEmployees(addEmployeeCB);
});
  
 })
 };
 
 //Add a New Department
  addDepartment = (addDepartCB) => {
    
    inquirer.prompt([{
 
     type: "input",
     name: "department",
     message: "What kind of department would you like to add?"
 
   },
 ]).then( function (res) {
   connection.query("INSERT INTO department SET ?", [
     {deptName:res.department}
    ], function (err, data){
     
     console.console.log(`Department ${res.department} was added successfully.`);
     
     showDepartments(addDepartCB);
   })
 })
 };
 
 addRole = (addRoleCB) => {
   //prompts for new employee info
   inquirer.prompt([{
 
     type: "input",
     name: "title",
     message: "What is the title of this role?"
 
   },
   {
     type: "input",
     name: "salary",
     message:"What is the salary of this role?"
   },
    {
      type: "number",
      name:"department_id",
      message:"What is the Department ID for this role?"
    },
 ]).then( function (res){
   connection.query("INSERT INTO role SET ?", [
     {
       title: res.title,
       salary: res.salary,
       department_id: res.department_id
     }
    ], function (){
     console.log( `${res.title} was added successfully`);
     
     // Shows table of roles
     showRoles(addRoleCB);
   })
   
 })
 }; 

 //-------------------------------------------------------
//  Functions to update employee role and manager
//-------------------------------------------------------
 

 function updateRole(updateEmployeeRoleCB){
     connection.query("SELECT * FROM employee", function (err, res){
         console.table(res);


   inquirer.prompt([{
 
    type: "number",
    name: "employeeID",
    message: "What is the ID of the employee you would like to update?"

  },
  {
    type:"number",
    name: "employeeUpdateRole",
    message: "What is the ID of this employees new role?"
  }
]).then( function (res){
  connection.query("UPDATE employee SET ? WHERE ?", [
      {role_id: res.employeeUpdateRole},
      { id: res.employeeID },

  ], function (err, data){
    if (err) throw err;
    console.log(err)
    console.table("Employee Sucessfully Updated");
    showEmployees(updateEmployeeRoleCB);
    
  })
  
})
     })
 
   
   
 }
 
 function updateManager(updateEmployeeManCB) {

    connection.query("SELECT * FROM employee", function (err, res){
        console.table(res);

        inquirer.prompt([{
 
            type: "number",
            name: "employeeID",
            message: "What is the ID of the employee you would like to update"
        
          },
          {
            type:"number",
            name: "employeeUpdateMan",
            message: "Please enter manager's employee ID to update this employee's manager."
          }
        ]).then( function (res){
          connection.query("UPDATE employee SET ? WHERE ?", [
              {
                  manager_id : res.employeeUpdateMan
              },
              {
                  id: res.employeeList
              }

          ], function (err, data){
            if (err) throw err;
            console.log(err);
            console.table("---Employee's manager has been successfully updated ---");

            showEmployees(updateEmployeeManCB);
            
          });
         
        })
    });
 }
 

 //DELETE FUNCTIONS
 function removeEmployee(removeEmployeeCB){

    connection.query("SELECT * FROM employee", function (err, res){
        console.table(res);

        inquirer.prompt([{
 
            type: "number",
            name: "removeEmployee",
            message: "What is the ID of the employee you would like to remove?"
        
          },
        ]).then( function (res){
            let newID = Number(res.removeEmployee)
          connection.query("DELETE FROM employee WHERE ?", [
              {
                  id: newID
              }
          ], function (err, data){
            if (err) throw err;
            
            console.log("---Employee Sucessfully Removed---");
            //Displays
            showEmployees(removeEmployeeCB);
          })
          
        })


    })
 
  
 
 };
 

 
 
 function removeRole(removeRoleCB) {

    connection.query("SELECT * FROM roles", function (err, res){

        inquirer.prompt([{
 
            type: "number",
            name: "removeRole",
            message: "What is the ID of the role to be removed?"
        
          },
        ]).then( function (res){
            let newID = Number(res.removeRole)
          connection.query("DELETE FROM roles WHERE ?", [{ id: newID}], function (err, data){
            if (err) throw err;
            
            console.log("Role Sucessfully Removed");

            showRoles(removeRoleCB)
            
          })  
        })
    })
 };


 function removeDepartment() {

  connection.query("SELECT * FROM roles", function (err, res){

      inquirer.prompt([{

          type: "number",
          name: "removeRole",
          message: "What is the ID of the role to be removed?"
      
        },
      ]).then( function (res){
          let newID = Number(res.removeRole)
        connection.query("DELETE FROM roles WHERE ?", [{ id: newID}], function (err, data){
          if (err) throw err;
          
          console.log("Role Sucessfully Removed");

          showRoles(removeRoleCB)
          
        })  
      })
  })
};
 


function Quit(){

}






 module.exports = {
   "showDepartments": showDepartments,
   "showRoles": showRoles,
   "showEmployees": showEmployees,
   "addDepartment": addDepartment,
   "addRole": addRole,
   "addEmployee": addEmployee,
   "removeDepartment" : removeDepartment,
   "removeEmployee" : removeEmployee,
   "removeRole": removeRole,
   "updateManager": updateManager,
   "updateRole" : updateRole,
   "Quit" : Quit
 }