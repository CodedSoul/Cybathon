const express=require("express");
const tls = require('tls');
const fs = require('fs');
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.get("/testapi",function(request,response){
//var api1=request.body.url1;
var api2="https://urlscan.io/api/v1/search/?q=domain:aashiyana.tatasteel.com";
var apif=api2;
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
            var dnew=newd.data.requests[1].response.response.securityDetails.cipher;
            response.write("<h1>ALG: "+dnew+"</h1>");
        });
        });
        console.log(d2);
        
        var imgurl="https://icons8.com/icon/Xjxtj2eaLoVE/ip-address";
       /* response.write("<img src="+imgurl+">");
        response.send();*/
    }
    catch(err)
    {
        console.log(err);
    }
});
});
});
var ssllabs = require("node-ssllabs");
var loggeddata='';
ssllabs.scan("aashiyana.tatasteel.com", function (err, host) {
	 responseData=host;
   // console.log(jsonData.name);
});
app.get('/download', (req, res) => {
    // Simulate your server response data
    ssllabs.scan("aashiyana.tatasteel.com", function (err, host) {
        console.log(host);
        var x=JSON.stringify(host);
        loggeddata+=host+'\n';
        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Server Response</title>
        </head>
        <body>
          <h1>Server Response:</h1>
          <pre>Name: ${JSON.parse(x)}</pre>
        </body>
      </html>
    `;
  
    const filename = 'response.html';
  
    // Set the appropriate headers for the response
   // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    //res.setHeader('Content-type', 'text/html');
  
    // Stream the HTML content to the client
   // res.send(htmlContent);
    //res.send(x);
    res.render("index1",{resp: x});
        // console.log(jsonData.name);
     });
    // Generate the HTML content
    
  });


// Assuming `responseData` contains the response data

/*app.get('/scan', (req, res) => {
    const url = req.query.url; // Get the URL from the query parameters
  
    // Perform the SSL scan
    const socket = tls.connect(443, url, () => {
      const cipher = socket.getCipher();
      const protocol = socket.getProtocol();
      const peerCertificate = socket.getPeerCertificate();
  
      // Build the response with scan results
      const scanResults = {
        cipher,
        protocol,
        issuer: peerCertificate.issuer,
        subject: peerCertificate.subject,
        validFrom: peerCertificate.valid_from,
        validTo: peerCertificate.valid_to
      };
  
      // Send the scan results as the response
      res.send(scanResults);
      socket.end();
    });
  
    socket.on('error', (error) => {
      /*console.error(error);
      res.status(500).send('Error occurred during SSL scan.');
      res.send(JSON.stringify(scanResults));
    });
  });*/







app.listen(3000,function(){
console.log("Server started on port 3000");
});