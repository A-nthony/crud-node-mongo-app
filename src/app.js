require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//connecting to db
mongoose.connect( process.env.MONGOOSE_URI,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('Db connected! 🎉 c:'))
  .catch(err => console.log(err));

//import routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//routes
app.use('/', indexRoutes);

//Static files
app.use(express.static(path.join(__dirname,"public")));

//start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})
