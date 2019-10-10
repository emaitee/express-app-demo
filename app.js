const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test_sample',
});

app.get('/', (req, res) => {
  res.json({ greetings: 'Hello' });
});

app.get('/users/all', (req, res) => {
  connection.query('SELECT * FROM `users`', function(err, results, fields) {
    res.json({ users: results });
  });
});

app.post('/users/new', (req, res) => {
  const { name, email, age } = req.body;
  console.log(req.body);

  connection.query(
    `INSERT INTO users(name, email, age) VALUES ("${name}","${email}","${age}")`,
        (err, results) => {
        res.json({ results });
        }
    );
});

app.listen(4000, () => console.log('App is running on port 4000'));
