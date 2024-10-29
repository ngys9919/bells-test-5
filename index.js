const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const { createConnection } = require('mysql2/promise');

let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// require in handlebars and their helpers
const helpers = require('handlebars-helpers');
// tell handlebars-helpers where to find handlebars
helpers({
    'handlebars': hbs.handlebars
})

let connection;

async function main() {
    connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    })

    app.get('/', (req,res) => {
        res.send('Hello, World!');
    });

    app.get('/employees', async (req, res) => {

        // Without sorting
        // 5.1 Creating the route to view all the customers
        // Obtaining the Results with Nested Tables
        // const [customers] = await connection.execute({
            // 'sql':`
            // SELECT * from Customers
                // JOIN Companies ON Customers.company_id = Companies.company_id;
            // `,
            // nestTables: true

        // });

        // With Ascending sorting
        // 5.1 Creating the route to view all the customers
        // Obtaining the Results with Nested Tables
        let [employees] = await connection.execute({
            'sql':`
            SELECT * from Employees
                JOIN EmployeeSupervisor ON Employees.employee_id = EmployeeSupervisor.employee_id
                LEFT JOIN Supervisors ON EmployeeSupervisor.supervisor_id = Supervisors.supervisor_id 
                ORDER BY Employees.name ASC;
            `,
            nestTables: true

        });

        // let [employees] = await connection.execute( `
            // SELECT * FROM Employees 
            // JOIN EmployeeSupervisor ON Employees.employee_id = EmployeeSupervisor.employee_id 
            // LEFT JOIN Supervisors ON EmployeeSupervisor.supervisor_id = Supervisors.supervisor_id
            // ` );

        // JavaScript Date Output
        // Independent of input format, JavaScript will (by default) output dates in full text string format:

        // Mon Oct 28 2024 00:12:41 GMT+0800 (Singapore Standard Time)

        // toDateString(): This method converts the date portion of a Date object into a human-readable string format.

        // Output: Mon Oct 28 2024

        // for (let e of employees) {
            // const date = new Date(e.date_joined);
            // let formattedDate = date.toDateString();
            // e.date_joined = formattedDate;
        // }

        
        // Formatted date_joined for each employee into YYYY-MM-DD format
        employees = employees.map(employee => {
            // employee.date_joined = 'Mon Oct 28 2024 00:12:41 GMT+0800 (Singapore Standard Time)';
            // console.log(employee);
            // console.log(employee.date_joined);
            let dateJoined = new Date(employee.Employees.date_joined); // assuming date_joined is the field name
            // console.log(dateJoined);
            let formattedDate = dateJoined.toISOString().split('T')[0]; // YYYY-MM-DD format
            return { ...employee, date_joined: formattedDate };
        });

        // console.log(employees)

        

        // Without sorting
        // let [customers] = await connection.execute('SELECT * FROM Customers INNER JOIN Companies ON Customers.company_id = Companies.company_id');
        // With Ascending sorting
        // let [customers] = await connection.execute('SELECT * FROM Customers INNER JOIN Companies ON Customers.company_id = Companies.company_id' ORDER BY first_name ASC);
        res.render('employees/index', {
            'employees': employees
        })
    })
    
    // 5.0 Coding the CRUD for an Entity with one to many relationship
    // Creating One to Many Relationship
    // 5.2 Create a route to display a form to add new customer
    // app.get('/customers/create', async(req,res)=>{
        // let [companies] = await connection.execute('SELECT * from Companies');
        // res.render('customers/create', {
            // 'companies': companies
        // })
    // })
    
    // 6. Creating Many to Many Relationship
    app.get('/employees/create', async(req,res)=>{
        let [supervisors] = await connection.execute('SELECT * from Supervisors');
        let [employees] = await connection.execute('SELECT * from Employees');
        let [employee_supervisor] = await connection.execute('SELECT * from EmployeeSupervisor');
        res.render('employees/create', {
            'supervisors': supervisors,
            'employees': employees,
            'employee_supervisor': employee_supervisor
        })
    })
    
    
    // 5.0 Coding the CRUD for an Entity with one to many relationship
    // Creating One to Many Relationship
    // 5.3 Processing the Form to add a new Customer
    // app.post('/customers/create', async(req,res)=>{
        // let {first_name, last_name, rating, company_id} = req.body;
        // let query = 'INSERT INTO Customers (first_name, last_name, rating, company_id) VALUES (?, ?, ?, ?)';
        // let bindings = [first_name, last_name, rating, company_id];
        // await connection.execute(query, bindings);
        // res.redirect('/customers');
    // })
    
    // 6. Creating Many to Many Relationship
    app.post('/employees/create', async(req,res)=>{
        let {name, designation, department, date_joined, supervisor_name, employee_supervisor_ranking} = req.body;
        let query = 'INSERT INTO Employees (name, designation, department, date_joined) VALUES (?, ?, ?, ?)';
        let bindings = [name, designation, department, date_joined];
        let [result] = await connection.execute(query, bindings);
    
        if (supervisor_name == '') {
            supervisor_name = null;
        }

        let [supervisors] = await connection.execute('SELECT * from Supervisors');

        let newSupervisor = false;
        let newSupervisorId = supervisors.supervisor_id;
        for (let s of supervisors) {
            // console.log('Name of Supervisor List', s.name);
            if ((s.name !== supervisor_name) && (supervisor_name != null)) {
                newSupervisor = true;      
            } else {
                newSupervisor = false;
                break;
            }
        }

        if (newSupervisor) {
            let query2 = 'INSERT INTO Supervisors (name) VALUES (?)';
            let bindings2 = [supervisor_name];
            let [result2] = await connection.execute(query2, bindings2);
            newSupervisorId = result2.insertId;
        }
        

        if (supervisor_name == null) {
            newSupervisorId = null;
        }

        let newEmployeeId = result.insertId;
        
        
        let query3 = 'INSERT INTO EmployeeSupervisor (employee_id, supervisor_id, ranking) VALUES (?, ?, ?)';
        let bindings3 = [newEmployeeId, newSupervisorId, employee_supervisor_ranking];
        await connection.execute(query3, bindings3);
    
        res.redirect('/employees');
    })
    
    
    // 5.0 Coding the CRUD for an Entity with one to many relationship
    // Update a One to Many Relationship
    // 5.4 Display a Form to Update a specific Customer
    // app.get('/customers/:customer_id/edit', async (req, res) => {
        // let [customers] = await connection.execute('SELECT * from Customers WHERE customer_id = ?', [req.params.customer_id]);
        // let [companies] = await connection.execute('SELECT * from Companies');
        // let customer = customers[0];
        // res.render('customers/edit', {
            // 'customer': customer,
            // 'companies': companies
        // })
    // })

    let supervisor_idEdit = null;

    // 7. Update a Many to Many Relationship
    app.get('/employees/:employee_id/edit', async (req, res) => {
        
        let [employees] = await connection.execute('SELECT * from Employees WHERE employee_id = ?', [req.params.employee_id]);
        let [employee_supervisors] = await connection.execute('SELECT * from EmployeeSupervisor WHERE employee_id = ?', [req.params.employee_id]);
    
        let employee_supervisor = employee_supervisors[0];

        // let supervisor_id = null;
        // supervisor_idEdit = employee_supervisor.supervisor_id;
        // let [supervisors] = [];
        // let supervisor = null;

        // if (supervisor_idEdit != null) {
            // [supervisors] = await connection.execute('SELECT * from Supervisors WHERE supervisor_id = ?', [supervisor_idEdit]);
            // supervisor = supervisors[0];
        // }
        
        // supervisor_idEdit = employee_supervisor.supervisor_id;
        // [supervisors] = await connection.execute('SELECT * from Supervisors WHERE supervisor_id = ?', [supervisor_idEdit]);
        // supervisor = supervisors[0];
        // const [supervisors] = await connection.execute('SELECT * from Supervisors');
        // console.log(supervisors);

        let supervisor = {supervisor_id: null, name: null};
        supervisor_idEdit = employee_supervisor.supervisor_id;
        supervisor.supervisor_id = supervisor_idEdit;
        let [supervisors] = await connection.execute('SELECT * from Supervisors');
        for (let s of supervisors) {
            // console.log('Name of Supervisor List', s.name);
            if ((s.supervisor_id == supervisor_idEdit) ) {
                supervisor.name = s.name;
                break;      
            } else {
                supervisor.supervisor_id = null;
                supervisor.name = null;
            }
        }

        // let employee = employees[0];
        

        // Formatted date_joined for each employee into YYYY-MM-DD format
        employees = employees.map(employee => {
            let dateJoined = new Date(employee.date_joined); // assuming date_joined is the field name
            let formattedDate = dateJoined.toISOString().split('T')[0]; // YYYY-MM-DD format
            return { ...employee, date_joined: formattedDate };
        });
        
        let employee = employees[0];

        res.render('employees/edit', {
            'employee': employee,
            'supervisor': supervisor,
            'employee_supervisor': employee_supervisor
        })
    });
    
    
    // 5.0 Coding the CRUD for an Entity with one to many relationship
    // Update a One to Many Relationship
    // 5.5 Processing the Update
    // app.post('/customers/:customer_id/edit', async (req, res) => {
        // let {first_name, last_name, rating, company_id} = req.body;
        // let query = 'UPDATE Customers SET first_name=?, last_name=?, rating=?, company_id=? WHERE customer_id=?';
        // let bindings = [first_name, last_name, rating, company_id, req.params.customer_id];
        // await connection.execute(query, bindings);
        // res.redirect('/customers');
    // })
    
    // 7. Update a Many to Many Relationship
    app.post('/employees/:employee_id/edit', async (req, res) => {
        let {name, designation, department, date_joined, supervisor_name, supervisor_ranking} = req.body;
    
        let query = 'UPDATE Employees SET name=?, designation=?, department=?, date_joined=? WHERE employee_id=?';
        let bindings = [name, designation, department, date_joined, req.params.employee_id];
        await connection.execute(query, bindings);
    

        let [supervisors] = await connection.execute('SELECT * from Supervisors');

        let newSupervisor = false;
        let newSupervisorId = null;
        let supervisor_id = supervisor_idEdit;

        if (supervisor_name == '') {
            newSupervisorId = null;
            supervisor_name = null;
            supervisor_id = null;
        }

        for (let s of supervisors) {
            // console.log('Name of Supervisor List', s.name);
            if ((s.name != supervisor_name) && (supervisor_name != null)) {
                newSupervisor = true;      
            } else if (supervisor_name == null) {
                newSupervisor = false;
                supervisor_id = null;
                break;
            } else {
                newSupervisor = false;
                supervisor_id =s.supervisor_id;
                break;
            }
        }

        if ((newSupervisor) && (supervisor_name != null)) {
            let query4 = 'INSERT INTO Supervisors (name) VALUES (?)';
            let bindings4 = [supervisor_name];
            let [result4] = await connection.execute(query4, bindings4);
            newSupervisorId = result4.insertId;
        } else if (supervisor_name != null) {
            let query2 = 'UPDATE Supervisors SET name=? WHERE supervisor_id=?';
            let bindings2 = [supervisor_name, supervisor_id];
            await connection.execute(query2, bindings2);
        }
        
        
    
        let query3 = 'UPDATE EmployeeSupervisor SET ranking=? WHERE employee_id=?';
        let bindings3 = [supervisor_ranking, req.params.employee_id];
        await connection.execute(query3, bindings3);
    
        if (newSupervisorId == null) {
            let query5 = 'UPDATE EmployeeSupervisor SET supervisor_id=? WHERE employee_id=?';
            let bindings5 = [supervisor_id, req.params.employee_id];
            await connection.execute(query5, bindings5);
        } else {
            let query6 = 'UPDATE EmployeeSupervisor SET supervisor_id=? WHERE employee_id=?';
            let bindings6 = [newSupervisorId, req.params.employee_id];
            await connection.execute(query6, bindings6);
        }
        

        res.redirect('/employees');
    });
    
    
    // 8. Implementing Delete
    // 8.1 Implement a Route to Show a Confirmation Form
    app.get('/employees/:employee_id/delete', async function(req,res){
        // display a confirmation form 
        const [employees] = await connection.execute(
            "SELECT * FROM Employees WHERE employee_id =?", [req.params.employee_id]
        );
        const employee = employees[0];

        res.render('employees/delete', {
            employee
        })

    })

    // 8. Implementing Delete
    // 8.2 Process the Delete
    app.post('/employees/:employee_id/delete', async function(req, res){
        await connection.execute(`DELETE FROM EmployeeSupervisor WHERE employee_id = ?`, [req.params.employee_id]);
        await connection.execute(`DELETE FROM Employees WHERE employee_id = ?`, [req.params.employee_id]);
        res.redirect('/employees');
    })

    app.listen(3000, ()=>{
        console.log('Server is running')
    });
}

main();
