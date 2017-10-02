'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    allowNull: false
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Todo.hasMany(models.TodoItem, {
          foreignKey: 'todoId',
          as: 'todoItems'
        });
      }
    }
  });
  return Todo;
};
