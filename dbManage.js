const inquirer = require("inquirer");
const mysql = require("mysql");
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
    connection.query('SELECT * FROM employee INNER JOIN	role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id', function (err, res) {
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
addEmployee =  (addEmployeeCB) => {

  connection.query("SELECT * FROM employee", function (err, res){

    console.table(res);

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
       type: "input",
       name:"role_id",
       message:"What is the employee's role ID?"
     },
     {
       type: "input",
       name:"manager_id",
       message: "What is the employee's manager ID? If no manager please press enter."
     }
  ]).then( function (res) {
 
   let data = {
     first_name: res.first_name,
     last_name: res.last_name,
     role_id: res.role_id
   }
   if (res.manager_id){
     data.manager_id = res.manager_id
   };

   connection.query("INSERT INTO employee SET ?", data, function (err, res) {
     console.log(err);
     console.log("New employee added sucessfully.");
   // Displays employees
   showEmployees(addEmployeeCB);
 });
   
  })

  })
 };
 
 //Add a New Department
  addDepartment = (addDepartCB) => {

    connection.query("SELECT * FROM department", function (err, res){
      console.table(res);

      inquirer.prompt([{
 
        type: "input",
        name: "department",
        message: "What kind of department would you like to add?"
    
      },
    ]).then( function (res) {
      connection.query("INSERT INTO department SET ?", [
        {deptName:res.department}
       ], function (err, res){
        
        console.log('Department was added successfully.');
        
        showDepartments(addDepartCB);
      })
    })
    
    
    
    
    
    })
    
    
 };
 
 addRole = (addRoleCB) => {

  connection.query("SELECT * FROM role", function (err, res){

    console.table(res);

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
       type: "input",
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
  
  
  })
   //prompts for new employee info
   
 }; 

 //-------------------------------------------------------
//  Functions to update employee role and manager
//-------------------------------------------------------
 

  updateRole = (updateEmployeeRoleCB) => {
     connection.query("SELECT * FROM employee", function (err, res){
         console.table(res);

  //Use the response to populate
   inquirer.prompt(
     [
       {
 
    type: "input",
    name: "id",
    message: "What is the ID of the employee you would like to update?"

  },
  {
    type:"input",
    name: "role_id",
    message: "What is the ID of this employees new role?"
  }
]).then((res) => {
  connection.query("UPDATE employee SET ? WHERE ?", [
      {role_id: res.role_id},
      {id: res.id },

  ], function (err, res) {
    console.log(err);
    
    showEmployees(updateEmployeeRoleCB);
    
  });
  
})
 })
    
 };
 
 updateManager = (updateEmployeeManCB) => {

    connection.query("SELECT * FROM employee", function (err, res){
        console.table(res);

        inquirer.prompt([{
 
            type: "input",
            name: "employee_id",
            message: "What is the ID of the employee you would like to update"
        
          },
          {
            type:"input",
            name: "manager_id",
            message: "Please enter manager's employee ID to update this employee's manager."
          }
        ]).then( function (res){
          connection.query("UPDATE employee SET ? WHERE ?", [
              {
                  manager_id : res.manager_id
              },
              {
                  id: res.employee_id
              }

          ], function (err, res){
            
            console.log(err);
            console.log("--- Employee's manager has been successfully updated ---");

            showEmployees(updateEmployeeManCB);
            
          });
         
        })
    });
 }
 
 //-------------------------------------------------------
//  Functions to update employee role and manager
//-------------------------------------------------------

//Remove Employee

 removeEmployee = (removeEmployeeCB) => {

    connection.query("SELECT * FROM employee", function (err, res){
        console.table(res);

        inquirer.prompt([{
 
            type: "input",
            name: "id",
            message: "What is the ID of the employee you would like to remove?"
        
          },
        ]).then( function (res){
            let newID = Number(res.id)
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
 
//Remove Role
 removeRole = (removeRoleCB) => {

    connection.query("SELECT * FROM role", function (err, res){
      console.table(res);

        inquirer.prompt([{
 
            type: "input",
            name: "id",
            message: "What is the ID of the role to be removed?"
        
          },
        ]).then( function (res){
            let newID = Number(res.id)
          connection.query("DELETE FROM role WHERE ?", [{ id: newID}], function (err, data){
            if (err) throw err;
            
            console.log("Role Sucessfully Removed");

            showRoles(removeRoleCB)
            
          })  
        })
    })
 };

//Remove Department
 removeDepartment = (removeDepartmentCB) => {


  connection.query("SELECT * FROM department", function (err, res){

    console.table(res);

      inquirer.prompt([{

          type: "input",
          name: "id",
          message: "What is the ID of the role to be removed?"
      
        },
      ]).then( function (res){
          let newID = Number(res.id)
        connection.query("DELETE FROM department WHERE ?", [{ id: newID}], function (err, data){
         console.log(err);
          
          console.log("Department Sucessfully Removed");

          showDepartments(removeDepartmentCB)
          
        })  
      })
  })
};
 



//Quit Function
quitApp = (quitAppCB) => {

  connection.end();
  quitAppCB();
  

};

//-------------------------------------------------------
// Exporting the functions
//-------------------------------------------------------

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
   "quitApp" : quitApp,
 };