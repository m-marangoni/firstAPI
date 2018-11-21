const express = require('express');
const users = require('./users.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send([1, 2, 3]));
app.get('/api/users', (req, res) => res.send(users)); 
app.get('/api/users/:id', (req, res) => {
    const foundUser = users.find(user => user.id === parseInt(req.params.id));
    if (!foundUser) {
        return res.status(404).send('deu merda');
    }
    res.send(foundUser);
}); 

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.send(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const updateUser = users.find(user => user.id === parseInt(req.params.id));
    if (!updateUser) {
        return res.status(404).send('deu merda');
    }
    if (!req.body.name || !req.body.email) {
        return res.status(400).send('precisa incluir nome e email!');
    }

     updateUser.name = req.body.name;
     updateUser.email = req.body.email;

   res.send(updateUser);
}); 
   

app.listen(3000, () => console.log('ouvindo na porta 3000...'));