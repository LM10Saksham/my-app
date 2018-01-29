import React from 'react';
import ChatBot from 'react-simple-chatbot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Helmet} from 'react-helmet';

var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser');
var path = require('path');
var app = express();

var watson = require("watson-developer-cloud");

var conversation = new watson.ConversationV1({
    username: '5e9aee44-052f-463e-9b9c-eb0c899ea045',
    password: 'ZHUBaZJsaVfu',
    version_date: '2017-05-26'
});

app.use(cookieParser());
app.use(bodyParser.json());

var context=null;

app.get('/', function (req, res) {
  conversation.message({
      input: {'text': req.body.text},
      workspace_id: '1cf9cd65-5506-4bc2-a31d-06872dec90dd',
      context: context
  },  function(err, response) {
      if (err)
      console.log('error:', err);
      else
     console.log(JSON.stringify(response, null, 2));
     context= response.context;
     res.sendfile(path.join(__dirname, 'public', 'input.html'));
    });
});

app.post('/send',(req, res) => {
    conversation.message({
      input: {'text': req.body.text},
      workspace_id: '1cf9cd65-5506-4bc2-a31d-06872dec90dd',
      context: context
  },  function(err, response) {
      if (err)
      console.log('error:', err);
      else
     console.log(JSON.stringify(response, null, 2));
     context= response.context;
     res.send(response.output.text);
    });
});

app.listen(3000, function () {
    console.log('App listening on port 8080!');
});

// all available props


const backStyle = {
  background : 'black' , 
  height : "100%",
  
  width : "100%"
}

function onClick(previousValue, steps){
  var text = previousValue;
          var request = new XMLHttpRequest();
          request.onreadystatechange=function(){
              if(request.readyState===4){
                  if(request.status===200)
                      document.getElementById('resp').innerHTML='watson says:- '+request.responseText;
                  else
                      alert('something went wrong');
              }
              
          };
          request.open('POST','/send', true);
          request.setRequestHeader('Content-Type','application/json');
          request.send(JSON.stringify({text:text})); 
      
}

const steps = [
   {
    id: 'first',
    message: 'Hello World',
    trigger: 'second',
},
{
  id: 'second',
  user: true,
  trigger: 'third',
},
{
  id: 'third',
  message: function ({ previousValue, steps }){
    var text = previousValue;
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
              if(request.readyState===4){
                  if(request.status===200){}
                      var response = request.responseText;
                  }
                  else{
                      alert('something went wrong');
                }
              }
    request.open('POST','/send', true);
          request.setRequestHeader('Content-Type','application/json');
          request.send(JSON.stringify({text:text}));
    return text
  },
  end:true,
}
];

const ThemedExample = () => (
  
  <MuiThemeProvider>
  <script src = "./server.js"></script>
  <Helmet>
                <style>{'body { background-color: black; }'}</style>
            </Helmet>
  <ChatBot steps={steps} style = {{marginTop : 75, width : '100%', height : "100%"}} inputStyle = {{height : '100%'}}/>;

  </MuiThemeProvider>
);

export default ThemedExample;