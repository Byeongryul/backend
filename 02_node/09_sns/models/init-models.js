let DataTypes = require("sequelize").DataTypes;
let _Follow = require("./Follow");
let _Hashtag = require("./Hashtag");
let _Post = require("./Post");
let _PostHashtag = require("./PostHashtag");
let _User = require("./User");

function initModels(sequelize) {
  let Follow = _Follow(sequelize, DataTypes);
  let Hashtag = _Hashtag(sequelize, DataTypes);
  let Post = _Post(sequelize, DataTypes);
  let PostHashtag = _PostHashtag(sequelize, DataTypes);
  let User = _User(sequelize, DataTypes);

  PostHashtag.belongsTo(Hashtag, { as: "hashtag", foreignKey: "hashtagId"});
  Hashtag.hasMany(PostHashtag, { as: "PostHashtags", foreignKey: "hashtagId"});
  PostHashtag.belongsTo(Post, { as: "post", foreignKey: "postId"});
  Post.hasMany(PostHashtag, { as: "PostHashtags", foreignKey: "postId"});
  Follow.belongsTo(User, { as: "follower", foreignKey: "followerId"});
  User.hasMany(Follow, { as: "Follows", foreignKey: "followerId"});
  Follow.belongsTo(User, { as: "follwing", foreignKey: "follwingId"});
  User.hasMany(Follow, { as: "follwing_Follows", foreignKey: "follwingId"});
  Post.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Post, { as: "Posts", foreignKey: "userId"});

  return {
    Follow,
    Hashtag,
    Post,
    PostHashtag,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
