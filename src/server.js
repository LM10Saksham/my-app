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

app.listen(8080, function () {
  	console.log('App listening on port 8080!');
});

