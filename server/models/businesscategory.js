'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessCategory extends Model {
    static associate(models) {
      BusinessCategory.belongsTo(models.Business)
      BusinessCategory.belongsTo(models.Category)
    }
  }
  BusinessCategory.init({
    BusinessId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BusinessCategory',
  });
  return BusinessCategory;
};