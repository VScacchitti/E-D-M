INSERT INTO department (name)
Values ("Human Resources"), ("IT"),("Legal"),("Sales");


INSERT INTO role (title, salary, department_id)
VALUES ("Manager-Sales", 100000, 20), ("Developer", 70000, 40), ("Manager-Project", 120000, 50), ("Attorney", 90000, 60), ("HR Administrator", 55000, 80);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Smith", 1, NULL), ("Amanda", "Solden", 2, 100), ("Shawna", "Ray", 1, NULL), ("Richard", "Lopez", 1, 101), ("Sandeep", "Aleki", 2, NULL), ("Ashley", "Simon", 4, NULL)