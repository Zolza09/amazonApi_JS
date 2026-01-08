const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urdun_category_link', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    urdun_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    cat_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'urdun_category_link',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Index_2",
        using: "BTREE",
        fields: [
          { name: "cat_id" },
        ]
      },
      {
        name: "Index_3",
        using: "BTREE",
        fields: [
          { name: "urdun_id" },
        ]
      },
    ]
  });
};
