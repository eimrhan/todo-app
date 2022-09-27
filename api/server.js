const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "Learn React",
    completed: true
  },
  {
    id: nanoid(),
    title: "Have a Job!",
    completed: false
  }
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
  const todo = {
    title: req.body.title,
    id: nanoid(),
    completed: false
  };
  todos.push(todo);
  return res.send(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  if (index > -1)
    todos.splice(index, 1);
  res.send(todos);
});

app.patch('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  if (index > -1)
    todos[index].completed = Boolean(req.body.completed);
  return res.send(todos[index]);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.blue.bold));