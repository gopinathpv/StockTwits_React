const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.send('YOUR EXPRESS BACKEND IS CONNECTED TO REACT' );
});


app.post("/data", function(req, res) {
  var inputdata = req.body.value;
  var jsondata;
  console.log("data",inputdata)
  inputdata = inputdata.toUpperCase();
  console.log("data",inputdata)
  fetch('https://api.stocktwits.com/api/2/streams/symbol/'+inputdata+'.json')
    .then(res => res.json())
    .then(data => {
      jsondata = data;
      res.json({ tweetsdata: jsondata });
    });
});

app.use((req,res,next)=>{
  const error = new Error('Not Found') 
  error.status(404) 
  next(error)
}) 

app.use((err,req,res,next)=>{
  res.status(err.status || 500) 
  res.json({
      err: {
          message :err.message
      }
  })
})

app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
});