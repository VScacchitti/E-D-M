INSERT INTO department
    (id, deptName)
VALUES
    (1, "Human Resources");

INSERT INTO department
    (id, deptName)
VALUES
    (2, "IT");
INSERT INTO department
    (id, deptName)
VALUES
    (3, "Legal");


INSERT INTO role
    (title, salary, department_id)
VALUES("HR Administrator", 76296.33, 1);

INSERT INTO role
    (title, salary, department_id)
VALUES("Developer", 87526.02, 2);

INSERT INTO role
    (title, salary, department_id)
VALUES("Attorney", 91432.47, 3);



INSERT INTO employee
    (first_name, last_name, role_id)
VALUES("Anthony", "Smith", 1);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES("Jon", "Jones", 2);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES("Stipe", "Mioic", 3);



INSERT INTO employee
    (first_name, last_name, role_id,manager_id)
VALUES("Dana", "White", 1, 1);

INSERT INTO employee
    (first_name, last_name, role_id,manager_id)
VALUES("Sean", "Shelby", 2, 2);

INSERT INTO employee
    (first_name, last_name, role_id,manager_id)
VALUES("Chuck", "Liddel", 3, 3);