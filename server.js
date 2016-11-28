var express=require('express');
var app=express();
var port=process.env.port || 3000;
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser=require('body-parser');

var passport=require('passport');
var flash=require('connect-flash');
var mongoose=require('mongoose');
var configDB=require('./config/database.js');

require('./config/passport.js')(passport);

mongoose.connect(configDB.url);

var morgan=require('morgan');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret:"anyStringOfText",
  saveUninitialized:true,
  resave:true
}));

 app.set('view engine','ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/*app.use('/',function(req,res){
  res.send('Hi i am runing node server');
   console.log(req.cookies);
   console.log("________________________========_______________");
   console.log(req.session);
});*/
require('./app/routes')(app,passport);

app.listen(port);
console.log("I am running on port"+port);
