const passport = require('passport');
const { DataTypes } = require('sequelize');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { sequelize } = require('../models');

const User = require('../models/User')(sequelize, DataTypes);

module.exports = () => {
  // 로그인할 때
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // 요청할 때
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
