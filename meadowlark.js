var express= require('express');
var jqupload = require('jquery-file-upload-middleware');
var fortunes = require('./lib/fortune.js');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var handlebars = require('express-handlebars').create({
 defaultLayout:'main',
 partialsDir: __dirname + '/views/partials/',
 helpers: {
   section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
 }
});

var app=express();
require('./routes.js')(app);
function getWeatherData(){
 return {
   locations: [
   {
     name: 'Portland',
     forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
     iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
     weather: 'Overcast',
     temp: '54.1 F (12.3 C)',
   },
   {
     name: 'Bend',
     forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
     iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
     weather: 'Partly Cloudy',
     temp: '55.0 F (12.8 C)',
   },
   {
     name: 'Manzanita',
     forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
     iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
     weather: 'Light Rain',
     temp: '55.0 F (12.8 C)',
   },
   ],
   };
}


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

app.use('/upload', function(req, res, next){
  var now = Date.now();
  jqupload.fileHandler({
    uploadDir: function(){
        return __dirname + '/public/uploads/' + now;
    },
    uploadUrl: function(){
       return '/uploads/' + now;
    },
  })(req, res, next);
});
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())

app.use(function(req,res,next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
})

app.use(function(req, res, next){
 if(!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weatherContext = getWeatherData();
 next();
});


app.use(function(req, res){
  res.status(404);
  res.render('404')
})

app.use(function(err, req ,res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
})



app.listen(app.get('port'),function(){
  console.log('express server started');
})
