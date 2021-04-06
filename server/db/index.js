const Sequelize = require('sequelize');
const path = require('path');
const {readdirSync} = require('fs');

const memory = false;
const force = false;

const loadModels = () => {
  try{
    const models = {};
    readdirSync(path.join(__dirname, 'models')).forEach( file => {
      if(!file.endsWith('model.js')) return;
      const modelName = file.split('.')[0];
      models[modelName] = (require(`./models/${file}`)(sequelize, models));
    });
    return models;
  } catch(err){
    console.error(err);
    process.exit(1)
  }
}

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: memory ? ':memory:' : 'database.sqlite',
  logging: false,
  dialectOptions: {}
});

console.log(`Database loaded: ${sequelize.options.dialect}:${sequelize.config.database}`)

const models = loadModels();
models.Application.hasMany(models.Hobby, { as: 'hobbyes' });
sequelize.sync({ force: force });

module.exports = {
  sequelize: sequelize,
  models: models
};