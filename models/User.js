const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        unique: true,
      },
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Email, {
      foreignKey: "userId",
      as: "emails",
      onDelete: "CASCADE",
    });
  };

  return User;
};
