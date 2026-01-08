var DataTypes = require("sequelize").DataTypes;
var _urdun = require("./urdun");
var _urdun_buteegdehuun = require("./urdun_buteegdehuun");
var _urdun_category = require("./urdun_category");
var _urdun_category_link = require("./urdun_category_link");
var _urdun_comment = require("./urdun_comment");
var _video = require("./video");

function initModels(sequelize) {
  var urdun = _urdun(sequelize, DataTypes);
  var urdun_buteegdehuun = _urdun_buteegdehuun(sequelize, DataTypes);
  var urdun_category = _urdun_category(sequelize, DataTypes);
  var urdun_category_link = _urdun_category_link(sequelize, DataTypes);
  var urdun_comment = _urdun_comment(sequelize, DataTypes);
  var video = _video(sequelize, DataTypes);


  return {
    urdun,
    urdun_buteegdehuun,
    urdun_category,
    urdun_category_link,
    urdun_comment,
    video,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
