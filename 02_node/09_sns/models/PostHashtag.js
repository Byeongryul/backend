const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PostHashtag', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    hashtagId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Hashtag',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'PostHashtag',
    schema: 'nodeBird',
    timestamps: true
  });
};
