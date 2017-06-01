module.exports = function(app){

app.get('/', function(req, res){
  res.render('home');
})

app.get('/nursery-rhyme', function(req, res){
 res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
 res.json({
   animal: 'squirrel',
   bodyPart: 'tail',
   adjective: 'bushy',
   noun: 'heck',
 });
});

app.get('/newsletter', function(req, res){
 res.render('newsletter', { csrf: 'CSRF token goes here' });
});

app.post('/process', function(req, res){
  console.log(req.accepts('json'));
  if(req.xhr || req.accepts('json')==='json'){
    res.send({ success: true });
  } else {
    res.redirect(303, '/thank-you');
  }
});

app.get('/contest/vacation-photo',function(req,res){
 var now = new Date();
 res.render('contest/vacation-photo',{
   year: now.getFullYear(),
   month: now.getMonth()
 });
});
app.post('/contest/vacation-photo/:year/:month', function(req, res){
 var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files){
   if(err) return res.redirect(303, '/error');
     console.log('received fields:');
     console.log(fields);
     console.log('received files:');
     console.log(files);
     res.redirect(303, '/thank-you');
  });
});



app.get('/about', function(req, res){
  var fortune = fortunes.getFortune();
  res.render('about', {fortune:fortune,
                       pageTestScript:'/qa/tests-about.js'}
  );
})

app.get('/tours/hood-river', function(req, res){
 res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
 res.render('tours/request-group-rate');
});

}
