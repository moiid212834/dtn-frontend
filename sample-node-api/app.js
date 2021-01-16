var express    = require('express');        // call express
var cors = require('cors')
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const validator = require('validator')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8000;

app.post('/api/v1/test', function (req,res){

  if (req.body.generateError==1) res.status(422).json({Validation:'Unsucessful'})
  const [email,fname,lname]=JSON.parse(req.body.values)
  console.log(email,fname,lname)
  if (validator.isEmail(email) && !validator.isEmpty(fname) && !validator.isEmpty(lname)) {
    res.status(200).json({Validation: 'Success'})
  } else {
    res.status(422).json({Validation:'Unsucessful'})
  }

})

app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.listen(port);
console.log('Magic happens on port ' + port);
