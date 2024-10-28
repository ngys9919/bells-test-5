<!-- .md means markdown -->

<!-- README.md -->
<!-- This file documents the information about the portfolio project. -->
<!-- It should be READ ME first!!! -->

<!-- Heading level 1 -->
# BELLS-TEST-5
**(SCTP) Full Stack Developer**

Module 7: **Back End Development**

***Project Assignment - Portfolio***

<!-- Heading level 3 -->
### Project File Structure:

* JavaScript Files

>>> Employees MySQL-Database System
: 

* BELLS-TEST-5 Folder (Sources Root)
: index.js
: .env
: .gitignore
: README.md
: package.json
: package-lock.json
: schema.sql
: data.sql

* IMG Folder (images)
: eds-database.png


* JSON Folder (json)
: q6-employees.md



<!-- Heading level 1 -->
# Project Guide
For the purpose of the portfolio project, a handlebars-driven backend application is created for the following:

```json
{
1. "CRUD Backend Application via HTTP-methods" : in our case "Employees MySQL-Database System"
}
```

This project is about a simple *Employees MySQL-Database System (EDS)* at **BELLS** using the concepts we learned in the Customer Relationship Management (CRM) System Express/MySQL lab (Back End Development Practical Assessment Guide). Instead of managing a database of customers, we'll be managing a database of employees in a company.

POST => C = Create: adding new data to the database   
GET => R = Read: get existing information   
POST => U = Update: update existing information in the database   
POST => D = Delete: remove existing information from the database

Using MySQL to store our database:

- company-xyz : represents the entire company database\
employee collection: represents the documents related to employees\
contact collection: represents the documents related to contact\
supervisor collection: represents the documents related to supervisor\
taskforce collection: represents the documents related to taskforce 


The application of this project caters to the needs of a specific target user group, the company executives,
who are looking for a relational database system to query the employees' particulars and do create, edit and delete the records.

The application provides a one-stop entry point to the database management of employees information, namely:

***
employee (Basic Info)
1. *employee_id*
2. *name*
3. *designation*
4. *department*
5. *contact* [
6. *_id*,
7. *office_phone*,
8. *office_did*,
9. *company_email* ]
10. *date_joined*
11. *supervisor* [
12. *employee_id*,
13. *name* ]
***

***
contact (Supplementary Info)
1. *_id*
2. *address1*
3. *address2*
4. *address3*
5. *mobile_phone*
6. *home_phone*
7. *office_phone*
8. *office_did*
9. *personal_email*
10. *company_email*
***

***
supervisor (Additional Info)
1. *employee_id*
2. *supervisor name*
3. *review report* [
4. *employee_id*,
5. *name*,
6. *rank* ]

***

***
taskforce (Additional Info)
1. *_id*
2. *members* [
3. *employee_id,*
4. *name,*
5. *role* ]
***

This simple software is a SQL Backend application for Employees MySQL-Database System.

It provides front-end web page for access using HTTP methods (only GET, POST) (note that browsers forms do not support put and delete http request method) to obtain and update the data from MySQL SQL database system.


![Employees MySQL-Database System: MySQL database](img/eds-database.png "database")

![Employees MySQL-Database System: GET](img/eds-search-employees.png "Query String => Search Engine")

![Employees MySQL-Database System: POST](img/POST-Create.png "POST => Create")

![Employees MySQL-Database System: GET](img/GET-Read.png "GET => Read")

![Employees MySQL-Database System: POST](img/POST-Update.png "POST => Update")

![Employees MySQL-Database System: POST](img/POST-Delete.png "POST => Delete")



<!-- Heading level 4 -->
#### The source codes is hosted as public on a [GitHub] [1] repository and the link is as follows: 

- [Source Codes GitHub Link](https://www.github.com/ngys9919/bells-test-5 "My source-codes!")
: Click the hyperlink <https://www.github.com/ngys9919/bells-test-5>




<!-- Heading level 2 -->
## Features

<!-- Heading level 3 -->
### Existing Features
The following routes are implemented with its related features:

For database access:



<br/>


<!-- Heading level 3 -->
### Future Implementation
The application could expand to include Security with JSON Web Token (JWT) in the Employees MySQL-Database System for sensitive data and operations like delete and update.

<!-- Heading level 2 -->
## Testing


1. Using Test-Cases




<!-- Heading level 2 -->
## Credits

### Acknowledgements
Thanks to Bells for support!

<!-- Heading level 2 -->
## About
> This project work, part of **Module 7: Back End Development**, 
> is an individual assessment done by Candidate’s Name (as in NRIC): **Ng Yew Seng** (Candidate’s NRIC: **S XXXX 3 5 3 / F**), 
> a trainee under the **(SCTP) Full Stack Developer** course, organized by **Bells Institute of Higher Learning**. 

>>
>> Coder: ***Ng Yew Seng***\
>> © Copyright 2024\
>> Bells Institute of Higher Learning


<!-- Heading level 2 -->
## Technologies Used
- [x] GitPod Cloud-hosted IDE
- [x] laragon: 
- [x] mysql2/promise: enables connecting to database
- [x] node/npm: create the Node application with node package manager for installing packages
- [x] express: creates a HTTP server
- [x] dotenv: stores sensitive information in a .env file
- [x] wax-on: 
- [x] hbs: 
- [x] handlebars-helpers: 

<!-- Heading level 2 -->
## References
1.  [GitPod](https://gitpod.io)

2.  [Microsoft GitHub](https://www.github.com)

3.  [Laragon](https://laragon.org)

4.  [Bells Institute of Higher Learning](https://bells.sg)

<!-- hyperlinks -->
[1]: https://github.com "GitHub"