const User = require('./user');
const Audio = require('./audio');
const Tag = require('./Tag');

User.hasMany(Audio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Audio.belongsTo(User, {
  foreignKey: 'user_id'
});

Audio.hasMany(Tags, {
    foreignKey: 'audio_id',
    onDelete: 'CASCADE'
  });
  
  Tags.belongsTo(Audio, {
    foreignKey: 'audio_id'
  });

module.exports = { User, Audio, Tag };