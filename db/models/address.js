'use strict';
module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    address: DataTypes.STRING(255)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Address;
};