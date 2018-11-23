const express = require('express');
const postits = require('./postits.js');
const Joi = require('joi');
const app = express();

app.use(express.json());


app.post('/api/postits', (req, res) => {
  const id = Math.max(...postits.map(postit => postit.id)) + 1;
  const newPostit = {
      id,
      title: req.body.title,
      content: req.body.content
  };
  const schema = {
    title: Joi.string().min(3).required(),
    content: Joi.string().min(6).required(),
}

const validation = Joi.validate(req.body, schema);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
  postits.push(newPostit);
  res.send(newPostit);
});


app.get('/', (req, res) => res.send('Hello World'));
app.get('/api/postits', (req, res) => res.send(postits)); 
app.get('/api/postits/:id', (req, res) => {
    const foundPostit = postits.find(postit => postit.id === parseInt(req.params.id));
    if (!foundPostit) {
        return res.status(404).send('not found');
    }
    res.send(foundPostit);
}); 


app.put('/api/postits/:id', (req, res) => {
    const updatePostit = postits.find(postit => postit.id === parseInt(req.params.id));
    if (!updatePostit) {
        return res.status(404).send('not found');
    }
        //usando Joi pra validar
  const schema = {
    title: Joi.string().min(3).required(),
    content: Joi.string().min(6).required(),
}

const validation = Joi.validate(req.body, schema);

    if (validation.error) {
        return res.status(400).send(validation,error.details[0].message);
    }
    
 
    // validação basica sem joi
    // if (!req.body.title || !req.body.content) {
    //     return res.status(400).send('precisa incluir nome e email!');
    // }

     updatePostit.title = req.body.title;
     updatePostit.content = req.body.content;

   res.send(updatePostit);
}); 

app.delete('/api/postits/:id',  (req, res) => {
    const deletePostit = postits.find(postit => postit.id === parseInt(req.params.id));
    if (!deletePostit) {
        return res.status(404).send('not found');
    } else {
    const index = postits.indexOf(deletePostit);
    postits.splice(index, 1);
    }
    res.send(postits);
});

app.listen(3000, () => console.log('ouvindo na porta 3000...'));