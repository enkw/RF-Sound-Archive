const User = require('./User');
const Audio = require('./Audio');
const Tag = require('./Tag');

User.hasMany(Audio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Audio.belongsTo(User, {
  foreignKey: 'user_id'
});

Audio.hasMany(Tag, {
    foreignKey: 'audio_id',
    onDelete: 'CASCADE'
  });
  
  Tag.belongsTo(Audio, {
    foreignKey: 'audio_id'
  });

module.exports = { User, Audio, Tag };