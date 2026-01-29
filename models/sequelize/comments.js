const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    comments: {
      type: DataTypes.STRING(450),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: true,
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
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Fk_comments_2_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "FK_comments_1_idx",
        using: "BTREE",
        fields: [
          { name: "bookId" },
        ]
      },
    ]
  });
};
