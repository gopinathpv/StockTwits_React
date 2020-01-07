const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors())


app.get('/', (req, res) => {
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname,'client', 'build', 'index.html'))
    })
  }
  
})


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



