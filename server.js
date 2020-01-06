const express = require('express');
const fetch = require("node-fetch");
const cors = require('cors')
const path  = require('path')

const app = express();



app.post("/data",function(req, res) {
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

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));