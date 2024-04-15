const sequelize = require('../config/connection');
const { User, Audio, Tag } = require('../models');

const userData = require('./userData.json');
const audioData = require('./audioData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const audio of audioData) {
    await Audio.create({
      ...audio,
      user_id: users.id,
    });
  }

  process.exit(0);
};

seedDatabase();