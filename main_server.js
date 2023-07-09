const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
const mongoose=require("mongoose");
const session = require('express-session');
const encrypt=require("mongoose-encryption");
app.set('view engine', 'ejs');
//const alert=require("alert");
//const popup=require("popups");
mongoose.connect("mongodb://0.0.0.0:27017/signup");
const signupSchema=new mongoose.Schema({
    user: String,
    passnew: String
});
const Signup=new mongoose.model("Signup",signupSchema);
app.use(session({
    secret: 'XyTDFHjk8U',
    resave: false,
    saveUninitialized: false
  }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/signup",function(request,response){
response.sendFile(__dirname+"/signup.html");
});
app.get("/postlogin",function(request,response){
response.send("<h1>Hello!!</h2><p> Sorry to say but you are Unauthorized!!</p>");
});
app.get("/login",function(request,response){
    response.sendFile(__dirname+"/index.html");
    });
app.post("/signup",function(request,response){
    var uname=request.body.username;
    var pass=request.body.password;
    const newuser=new Signup({
        user: uname,
        passnew: pass
    });
    newuser.save();
    response.redirect("/signup");
});
app.post("/login",function(request,response){
    const u1=request.body.uname;
    const p1=request.body.pass;
    async function creds(){
        const person = await Signup.findOne({ 'user': u1 });
        console.log(person);
        if(person)
        {
        if(person.user==u1 && person.passnew==p1)
        {
            response.sendFile(__dirname+"/postlogin.html");
            request.session.userId = person.user;
        }
        else
        {
            console.log("Incorrect username or password");
            response.send("<script>alert('Incorrect username or password')</script>");
           // alert("Incorrect username or password");
        }
    }
    else
    {
        console.log("Incorrect username or password");
        response.send("<script>alert('Incorrect username or password')</script>");
    }
    }
    creds();
});
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session', err);
      }
      res.redirect('/login');
    });
  });
  app.post("/urlscan",function(request,response){
    const murl=request.body.mainurl;
    var api2="https://urlscan.io/api/v1/search/?q=domain:";
var apif=api2+murl;
https.get(apif,function(res){
var apid="";
console.log(res.status)
res.on("data",function(chunk){
apid=apid+chunk;
});
res.on("end",function(){
    try{
        var d1=JSON.parse(apid);
        var d2=d1.results[0].page.ip;
        var redir=d1.results[0].result;
        https.get(redir,function(res1){
            var apid1="";
console.log(res1.status)
res1.on("data",function(chunk1){
apid1=apid1+chunk1;
});
        res1.on("end",function(){
            var newd=JSON.parse(apid1);
            var cip=newd.data.requests[1].response.response.securityDetails.cipher;
            var ur=newd.data.requests[0].request.request.url;
            var i=newd.data.requests[0].response.asn.ip;
            var ci=newd.data.requests[0].response.response.securityDetails.certificateId;
            var keg=newd.data.requests[0].response.response.securityDetails.keyExchangeGroup;
            var cid=newd.lists.certificates[0].issuer;
            var ctc=newd.data.requests[0].response.response.securityDetails.certificateTransparencyCompliance;
            var cs=newd.data.requests[1].response.response.securityHeaders[0].value;
            var ex=newd.data.requests[0].response.response.headers.expires;
            var xs=newd.data.requests[1].response.response.headers['x-xss-protection'];
            var tl=newd.data.requests[0].response.response.securityDetails.protocol;
            var xf=newd.data.requests[0].response.response.headers['x-frame-options'];
            response.render("index1",{url:ur,ip:i,ciph:cip,cid:ci,ke:keg,ci:cid,ct:ctc,csp:cs,exp:ex,xss:xs,tls:tl,xfo:xf});
        });
        });
        console.log(d2);
        
       /* var imgurl="https://icons8.com/icon/Xjxtj2eaLoVE/ip-address";
        response.write("<img src="+imgurl+">");
        response.send();*/
    }
    catch(err)
    {
        console.log(err);
    }
});
});
  });
app.listen(3000,function(){
console.log("Server started on port 3000");
});

