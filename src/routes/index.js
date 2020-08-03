const express = require('express');
const router = express.Router();
const Guia = require('../models/guias');


router.get('/', async (req, res) => {
   const guias= await Guia.find();
 /*  var d = guias[0].timestamps;
console.log(d.getUTCHours()); // Hours
console.log(d.getUTCMinutes());
console.log(d.getUTCSeconds());
console.log(d.getUTCMonth());
console.log(d.toString());
   console.log(guias)*/
  res.render('index', {
    guias
  });
});



router.post('/addguia', async(req,res,next)=>{
  const numGuia=req.body.guia;
  const consultaGuia= await Guia.findOne({"guia":numGuia});
  
  if(consultaGuia){
    console.log('guia repetida')
    res.send('<p>Guia Repetida</p>');
  }else{
    const guia = new Guia(req.body);
    await guia.save();
  }
  res.redirect('/');
});
router.post('/find', async(req,res,next)=>{
  const numGuia=req.body.guia;
  const consultaGuia= await Guia.find({"status":"true"});
  
  console.log(consultaGuia)
  res.render('busqueda',{
    consultaGuia
  });
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Guia.remove({_id: id});
  res.redirect('/');
});



router.get('/delete', async (req, res, next) => {
    const tasks = await Task.find();
    for(var i=0; i < tasks.length; i++){
       let clave= tasks[i]._id;
       console.log(clave)
       const task = await Task.findById(clave);
       task.money=0;
       await task.save();
    }
    res.redirect('/');
  });
  router.get('/turn/:id', async (req, res, next) => {
    let { id } = req.params;
    const guias = await Guia.findById(id);
    guias.status = !guias.status;
    await guias.save();
    res.redirect('/');
  });

module.exports = router;