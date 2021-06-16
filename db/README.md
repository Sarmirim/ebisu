Connect via db platform (pgAdmin, ...) or docker cli.

Default connection:
* Name: ebisu
* Host: localhost
* Port: 32000
* Username: admin
* Password: admin

PostgreSQL commands:
```
psql -h localhost -p 5432 -U admin -d ebisu
select * from tokens;
```