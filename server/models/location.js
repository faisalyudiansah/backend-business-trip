'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Business)
    }
  }

  Location.init({
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    address3: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    BusinessId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};