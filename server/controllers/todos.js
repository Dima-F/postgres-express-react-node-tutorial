const {Todo, TodoItem} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
      return Todo
        .create({
          title: req.body.title,
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => res.status(400).send(error));
    },
    list(req, res) {
      return Todo
        .findAll({
          include: [{
            model: TodoItem,
            as: 'todoItems',
          }],
          where:{
            id:{
              [Op.lt]: 5
            }
          }
        })
        .then(todos => res.status(200).send(todos))
        .catch(error => {
          //throw (error);
          res.status(400).send(error);
        });
    },
    retrieve(req, res) {
      return Todo
        .findById(req.params.todoId, {
          include: [{
            model: TodoItem,
            as: 'todoItems',
          }],
        })
        .then(todo => {
          if (!todo) {
            return res.status(404).send({
              message: 'Todo not found'
            });
          }
          return res.status(200).send(todo);
        })
        .catch(err => res.status(400).send(err));
    },
    update(req, res) {
      return Todo
        .findById(req.params.todoId, {
          include: [{
            model: TodoItem,
            as: 'todoItems',
          }],
        })
        .then(todo => {
          if (!todo) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return todo
            .update({
              title: req.body.title || todo.title,
            })
            .then(() => res.status(200).send(todo)) // Send back the updated todo.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
      return Todo
        .findById(req.params.todoId)
        .then(todo => {
          if (!todo) {
            return res.status(400).send({
              message: 'Todo Not Found',
            });
          }
          return todo
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
