const port = 3000

const express = require('express')
const app = express()

const names = [
    "Ana",
    "Breno",
    "Camila",
    "David",
    "Ester",
    "Felipe",
    "Gabriela",
    "Hugo",
    "Isabela",
    "João"
];

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// let values = ["INSERT", "INTO", "users(username)", "VALUES"];

// names.forEach((v, index) => {
//     let value;
//     if (index < names.length - 1) {
//         value = `('${v}'),`;
//     } else {
//         value = `('${v}');`
//     }

//     values.push(value);
// })

// const sql = values.join(" ");
// const sql = `INSERT INTO users(username) values('${names[Math.floor(Math.random() * names.length)]}')`;
// connection.query(sql);
// connection.end();


app.get('/', async(req,res) => {
    const connection = mysql.createConnection(config);

    const name = req.query.name;

    if (name === undefined) {
        const query = `INSERT INTO users(username) values('${names[Math.floor(Math.random() * names.length)]}')`;
        connection.query(query);
    } else {
        const query = `INSERT INTO users(username) values('${name}')`;
        connection.query(query);
    }

    const query = `SELECT * FROM users;`;
    

    await connection.query(query, (_, result) => {
        connection.end();
        let response = ["<h1>Full Cycle!!!</h1>", "<ul>"];
        result.forEach((v) => {
            response.push(`<li>${v.username}</li>`);
        })
        response.push("</ul>");

        res.send(response.join("\n"));
    });
    // await connection.end();
})

app.listen(port, () => {
    console.log("Listening in port" + port);
})