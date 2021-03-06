
var User=require('../models/users.js');

module.exports=function(app,passport){
  app.get('/',function(req,res){
    res.render('index.ejs');
  })

app.get('/signup',function(req,res){
  res.render('signup.ejs',{message:req.flash('signupMessage')});
})

app.get('/login',function(req,res){
  res.render('login.ejs',{message:req.flash('loginMessage')})
})

app.post('/login',passport.authenticate('local-login',{
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash:true
}))
app.get('/profile',isLoggedIn,function(req,res){
  res.render('profile.ejs',{user:req.user})
})
app.post('/signup',passport.authenticate('local-signup',{
  successRedirect:'/',
  failureRedirect:'/signup',
  failureFlash:true
}))

app.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
res.redirect('/login');

}

app.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));



/*app.post('/signup',function(req,res){
  var newUser= new User();
  newUser.local.username=req.body.email;
  newUser.local.password=req.body.password;

   newUser.save(function(err,result){
     if(err) throw err;
     console.log('--------',result);
   })
   res.redirect('/');
})
*/
}
