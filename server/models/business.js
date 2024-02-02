'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      Business.hasOne(models.Location)
      Business.belongsToMany(models.Category, { through: 'BusinessCategory' })
    }
  }
  Business.init({
    alias: DataTypes.STRING,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    is_closed: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
    review_count: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    transactions: DataTypes.ARRAY(DataTypes.STRING),
    price: DataTypes.STRING,
    phone: DataTypes.STRING,
    display_phone: DataTypes.STRING,
    distance: DataTypes.GEOMETRY('POINT', 4326)
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};