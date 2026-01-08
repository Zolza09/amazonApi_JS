const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urdun_comment', {
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
    ognoo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ner: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(450),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'urdun_comment',
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
    ]
  });
};
