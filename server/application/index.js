const router = require('express').Router();
const db = require('./../db');

router.get('/check-email/:email', async (req, res) => {
  try{
    const email = req.params.email || '';
    if(!email) throw Error('Проверьте правильность данных');
    
    try{
      const result = await db.models.Application.findOne({
        where: {
          email: email
        }
      });
      try{
        if(result) 
          throw new Error('Анкета с таким поле email уже существует');
        const match = email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        if(match === null)
          throw new Error('Email введён некоректно');
        if(['test@test.test'].includes(email)) 
          throw Error('Похоже анкета с таким E-Mail уже существует');
        res.send({
          success: true,
          exists: false,
        });
      } catch(e){
        res.send({
          success: true,
          exists: true,
          message: e.message
        });
      }
    } catch(e){
      throw Error('Database error');
    }
  } catch(e) {
    res.status(500).send({
      success: false,
      message: e.message,
    })
  }
});

router.post('/', async (req, res, next) => {
  try{
    const data = req.body;
    if(!data.firstName || !data.lastName || !data.dateOfBirth || !data.framework || !data.frameworkVersion || !data.email) 
      throw Error('Проверьте правильность данных');
    try{
      const result = await db.models.Application.create({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        framework: data.framework,
        frameworkVersion: data.frameworkVersion,
        email: data.email,
      });
      if(result && result.id && data.hobbyes && data.hobbyes.length){
        const hobbyes = [];
        data.hobbyes.forEach( item => {
          hobbyes.push({
            name: item.name,
            duration: item.duration,
            ApplicationId: result.id,
          });
        })
        let results = await db.models.Hobby.bulkCreate(hobbyes);
      }
      res.send({
        success: true,
        result: result
      });
    } catch(e) {
      console.error(e)
      throw Error('Database error');
    }
  } catch(e) {
    next(e)
  }
});

router.get('/', async(req, res, next) => {
  try{
    try{
      const results = await db.models.Application.findAll({
        where: {},
        include: [{ model: db.models.Hobby, as: "hobbyes"} ],
      });
      res.send({
        success: true,
        results: results
      })
    } catch(e) {
      console.error(e)
      throw Error('Database error');
    }
  } catch(e){
    next(e);
  }
})

module.exports = router;