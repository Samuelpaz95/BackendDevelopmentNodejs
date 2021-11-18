# Basic CRUD aplication
This is a simple application to create links, this is a practice with the Javascript language using nodejs and libraries following the faztcode tutorial [fastweb](https://www.faztweb.com/).

This application has a login authentication for user sessions.

![img](.github/images/capture.png)

# Requirements
To run the program we need to install the following tools:
- Nodejs v16.13.0
- npm v8.1.0
- MySQL v8.0.27

# Dependencies
## migrations
Install these dependencies:
* sequelize-cli@6.3.0
```bash
npm install -g sequelize-cli@6.3.0
```
* sequelize-mig@3.1.3
```bash
npm install -g sequelize-mig@3.1.3
```
Into `src/models/config.json`:
```json
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "databae_name",
    "host": "localhost",
    "dialect": "mysql"
  }, ...
```
## local dependencies
- `package.json`
```json
{
    "dependencies": {
        "bcryptjs": "^2.4.3",
        "connect-flash": "^0.1.1",
        "express": "^4.17.1",
        "express-handlebars": "^5.3.5",
        "express-mysql-session": "^2.1.7",
        "express-session": "^1.17.2",
        "express-session-sequelize": "^2.3.0",
        "express-validator": "^6.13.0",
        "morgan": "^1.10.0",
        "passport": "^0.5.0",
        "passport-local": "^1.0.0",
        "sequelize": "^6.9.0",
        "timeago.js": "^4.0.2"
    }
}
```
Run `npm install` to install all dependencies.
# Launch server
You must first build the database tables:
```bash
npm run makemigration
# and
npm run migrate
```
To launch the server run:
```bash
npm run dev
```
Now visit: http://localhost:4000

# Structure
```bash
├── database
│   └── db.sql
├── migrations
│   ├── 20211118044408_crud_app.js
│   └── _current.json
├── package.json
├── package-lock.json
├── README.md
├── seeders
└── src
    ├── app.js
    ├── database.js
    ├── keys.js
    ├── lib
    │   ├── auth.js
    │   ├── handlebars.js
    │   ├── helpers.js
    │   └── passport.js
    ├── models
    │   ├── config.json
    │   ├── index.js
    │   ├── link.js
    │   └── user.js
    ├── public
    │   └── js
    │       └── main.js
    ├── routes
    │   ├── authentication.js
    │   ├── index.js
    │   └── links.js
    └── views
        ├── auth
        ├── layouts
        ├── links
        └── partials
```

# Programmer
* **Willy Paz**
