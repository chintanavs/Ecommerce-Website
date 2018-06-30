const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const engine=require('ejs-mate');
const session=require('express-session');
const flash=require('express-flash');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo')(session);
const passport=require('passport');


const User=require('./models/user.js');
const secret=require('./config/secret');
const Category=require('./models/category.js');
const cartLength=require('./middlewares/middlewares.js');


var app=express();

mongoose.connect(secret.database,function(err){
  if(err){
    console.log(err);;
  }else{
    console.log('connected to the database');
  }
});

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:secret.secretKey,
  store:new MongoStore({url:secret.database,autoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cartLength);
app.use(function(req,res,next){
  res.locals.user=req.user;
  next();
});
app.use(function(req,res,next){
  Category.find({},function(err,categories){
    if(err) return next(err);
    res.locals.categories=categories;
    next();
  });
});


app.engine('ejs',engine);
app.set('view engine','ejs');

// app.get('/',function (req,res){
//   res.render('main/home');
// });

var userRoutes=require('./routes/user');
var mainRoutes=require('./routes/main');
var adminRoutes=require('./routes/admin');
var apiRoutes=require('./api/api');
app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use('/api',apiRoutes);

app.listen(secret.port,(err)=>{
  if (err) throw err;
  console.log('server is on');
});
