'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ToDo.init({
    user_id: {
      type: DataTypes.UUID,
      primaryKey: false,
    },
    todo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    todo_title: {
      type: DataTypes.STRING,
    },
    todo_description: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    charset: "utf8",
    collate: "utf8_general_ci",
    tableName: "todos",
    modelName: 'ToDo',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return ToDo;
};