const router = require('../../routers/admin/dashboard.route.js')
const dudoannhietdo = require('../../modules/handler/dudoannhietdo.js')
const dudoandoam = require('../../modules/handler/dudoandoam.js')
const saveDataToDataBase = require('../../public/admin/js/saveDataFromThinkSpeak.js')
const sendEmail = require('../../modules/handler/sendEmail.js')

module.exports.dashboard = (req,res) =>{
  saveDataToDataBase();
  res.render('admin/dashboard');
}

module.exports.cambienkhigas = (req,res) =>{
  saveDataToDataBase();
  res.render('admin/cambienkhigas');
}

module.exports.cambiennhietdo = (req,res) =>{
  saveDataToDataBase();
  res.render('admin/cambiennhietdo');
}

module.exports.cambiendoam = (req,res) =>{
  saveDataToDataBase();
  res.render('admin/cambiendoam');
}

module.exports.dudoannhietdo = async (req,res) =>{
  await dudoannhietdo();
  res.render('admin/cambiennhietdo');
}

module.exports.dudoandoam = async (req,res) =>{
  await dudoandoam();
  res.render('admin/cambiendoam');
}

module.exports.sendEmail = async (req,res) =>{
  await sendEmail(req,res);   
}