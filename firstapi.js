const express = require('express');
const users = require('./users.js');
const app = express();
const Joi = require('joi');




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
    const id = Math.max(...users.map(user => user.id));
    const newUser = {
        id,
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
        //usando Joi pra validar
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required(),
}

const validation = Joi.validate(req.body, schema);

    if (validation.error) {
        return res.status(400).send(validation,error.details[0].message);
    }
    
 
    // validação basica sem joi
    //if (!req.body.name || !req.body.email) {
    //    return res.status(400).send('precisa incluir nome e email!');
    //}

     updateUser.name = req.body.name;
     updateUser.email = req.body.email;

   res.send(updateUser);
}); 

app.delete('/api/users/:id',  (req, res) => {
    const deleteUser = users.find(user => user.id === parseInt(req.params.id));
    const index = users.indexOf(deleteUser);

    if (!deleteUser) {
        return res.status(404).send('deu merda');
    }
    users.splice(index, 1);
    res.send('usuário excluído com sucesso!', deleteUser);
});

app.listen(3000, () => console.log('ouvindo na porta 3000...'));