#init postgres
sudo systemctl restart postgresql.service
sudo -i -u postgres psql

create database mb;
\c mb
ALTER USER postgres PASSWORD 'postgres';
create table posts (post_id SERIAL PRIMARY KEY, datetime TIMESTAMP, author VARCHAR(255), text VARCHAR(255));
