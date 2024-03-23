# typescript-essentials-microblogging
A sample for TypeScript Essentials lecture.

This lecture was presented in March 23th, 2024 in Universidade de Coimbra, Portugal. The presentation slides are available in this repository in the file typescript-essentials-presentation.pdf.

## Setup
The following apllications must be installed in your computer:
```
node
node-typescript
postgresql
Visual Studio Code (or other preferred IDE)
```
### PostgreSQL setup
After installing, the PostgreSQL service must be up. In Linux environments you can set it up by running the following command:
```
sudo systemctl restart postgresql.service
```
After that, it's time to enter PSQL command-line:
```
sudo -i -u postgres psql
```
You may need to set up a postgres password in order to use the database in the backend. Run the following command to change it:
```
ALTER USER postgres PASSWORD 'postgres';
```
It's time to create the database. Run the two lines below. The last one will set this database as current:
```
create database microblog;
\c microblog
```
The last command below will create a table with the desired schema in the previously set database.
```
create table posts (id SERIAL PRIMARY KEY, created_at TIMESTAMP, author VARCHAR(255), text VARCHAR(255));
```
### Backend setup
The backend code is ready to use in this repository. You only need to run:
```
cd microblog-backend
npm i
npm start
```
If needed, follow the instructions of the slideshow in order to configure the backend properly.
### Frontend setup
The frontend code is ready to use in this repository. You only need to run:
```
cd microblog-frontend
npm i
npm run dev
```
If needed, follow Vite's instructions in order to rebuild the frontend.