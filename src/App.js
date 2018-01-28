import React from 'react';
import ChatBot from 'react-simple-chatbot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Helmet} from 'react-helmet';
// all available props


const backStyle = {
  background : 'black' , 
  height : "100%",
  
  width : "100%"
}
var request = new XMLHttpRequest();
const steps = [
   {
  id: '1',
  message: 'Hi. It looks like a nice drive today. What would you like me to do?',
  trigger: '2',
},
{
  id: '2',
  message:  request.onreadystatechange=function({ previousValue, steps }){
              if(request.readyState==4){
                  if(request.status==200)
                      document.getElementById('resp').innerHTML='watson says:- '+request.responseText;
                  else
                      alert('something went wrong');
              }
              
          },
  trigger: ({ value, steps }) => '3',
},
{
  id: '3',
  message: 'Bye',
  end: true,
}
];

const ThemedExample = () => (
  
  <MuiThemeProvider>
  <Helmet>
                <style>{'body { background-color: black; }'}</style>
            </Helmet>
  <ChatBot steps={steps} style = {{marginTop : 75, width : '100%', height : "100%"}} inputStyle = {{height : '100%'}}/>;
  
  </MuiThemeProvider> 
);

export default ThemedExample;