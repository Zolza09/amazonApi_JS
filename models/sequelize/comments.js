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
      allowNull: true,
      validate: {
        // isEmail: {
        //   msg: "Заавал имэйл оруулна уу",
        // },
        notContains: {
          args: ['миа'],
          msg: "Энэ мэссэжлд хориглогдсон үг байна",
        },
      },
      // comments duudah bolgond ene get func ajillana
      get() {
        let comment = this.getDataValue('comments').toLowerCase();
        return comment.charAt(0).toUpperCase() + comment.slice(1);
      },
      // hadgalahdaa oorchilj bolno haraal ug ntr bval oorchilj bolno
      set(value) {
        this.setDataValue('comments', value.replace('миа', 'тиймэрхүү'));
      }
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
