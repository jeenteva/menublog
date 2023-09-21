const express = require('express')
const app = express()
const path = require('path')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());   



// const route = require('./controller/home')
// app.use('/',route)

const home = require('./controller/home')
app.use('/',home)

const admin = require('./controller/admin')
app.use('/admin',admin)



app.get('*', function(req, res){
    res.redirect('/404')
  });
  
  app.listen(3000,function(){
    console.log('Bu port mükemmel çalışıyor.');
  })

   app.get('/',(req,res)=>{
    res.render('./home/index',{
        lang : lang
    })
})







  