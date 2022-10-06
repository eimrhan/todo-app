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
let toggleValue = false

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
  const todo = {
    title: req.body.title, // req.body ile data altında gönderdiğimiz verilere erişebiliriz.
    id: nanoid(),
    completed: false
  };
  todos.push(todo);
  res.status(201); // response çeşidine göre bir cevap dönebilirsin. eklemezsen varsayılan değer döner.
  res.send(todo); // burada return yazmak zorunlu olmasa da kodun bittiğini belli edeceği için kullanmak istenebilir.
}); // response dönmek zorundasın. res.send'den dönen sonuca göre browser işlemine devam eder
    // bunun içinde döndüğün veri data'ya yazılır. kullanırken .data ile erişilebilir.

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id); // url'e bağlı gelen veri params olarak alınır
  if (index > -1)
    todos.splice(index, 1);
  res.status(204);
  res.send();
});

app.delete('/todos', (req, res) => {
  todos = todos.filter(todo => todo.completed === false)
  res.status(204);
  res.send(true)
});

app.patch('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  if (index > -1)
    todos[index].completed = Boolean(req.body.completed);
  res.send(todos[index]);
});
// sadece tek bir item'ın tek alanı güncellenecekse patch kullanımı tercih edilebilir.
// birden fazla item ve alan güncellemek gerekiyorsa bu durumda post tercih edilir.

app.post('/todos/toggleAll', (req, res) => {
  toggleValue = Boolean(req.body.itemsLeft)
  todos.map(todo => todo.completed = !toggleValue)
  toggleValue = !toggleValue
  res.send(toggleValue)
})

app.post('/todos/:id', (req, res) => {
  todos.some(todo => {
    if (todo.id === req.body.id)
      return todo.title = req.body.title
  })
  res.send(todos)
})

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.blue.bold));