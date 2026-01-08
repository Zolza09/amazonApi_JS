const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urdun', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ognoo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    web_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    garchig: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    urdun: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    view: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 1
    },
    share_button: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'urdun',
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
          { name: "ognoo" },
        ]
      },
      {
        name: "Index_3",
        using: "BTREE",
        fields: [
          { name: "web_id" },
        ]
      },
      {
        name: "Index_4",
        using: "BTREE",
        fields: [
          { name: "view" },
        ]
      },
    ]
  });
};
