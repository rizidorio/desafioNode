import express from 'express';
import { createConnection } from 'mysql';

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafiodb'
};

const names = [
    "Letícia",
    "Lucas",
    "Marcos",
    "Vinicius",
    "Jussara",
    "Carlos"
];

function GetName(names) {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

const connection = createConnection(config);

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
    
    const createTable = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255) NOT NULL
    )`;
    connection.query(createTable, (err) => {
      if (err) throw err;
    });
  });

app.get('/', (req, res) => {
    const insertName = `INSERT INTO people(name) VALUES('${GetName(names)}')`;
    connection.query(insertName, (err) => {
      if (err) throw err;
      
      connection.query(`SELECT name FROM people`, (err, results) => {
        if (err) throw err;
  
        const namesList = results.map((row) => `<li>${row.name}</li>`).join('');
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
      });
    });
  });

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
