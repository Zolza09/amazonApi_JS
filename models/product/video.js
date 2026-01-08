const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('video', {
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
      type: DataTypes.STRING(450),
      allowNull: false
    },
    garchig: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    video: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    tailbar: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'video',
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
    ]
  });
};
