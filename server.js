const express = require('express');
var fetch = require("node-fetch");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
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


if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));
}

app.get("*",(req,res) => {
  res.sendFile(path.resolve(__dirname,"client","build","index.html"))
})