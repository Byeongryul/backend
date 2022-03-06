const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hashtag', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "Hashtag_title_key"
    }
  }, {
    sequelize,
    tableName: 'Hashtag',
    schema: 'nodeBird',
    timestamps: true,
    indexes: [
      {
        name: "Hashtag_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Hashtag_title_key",
        unique: true,
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
