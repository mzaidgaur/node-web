const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}:${req.method}:${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err)
		{
			console.log('Unable to log.');
		}
	});
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('capitalize',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		title:'Home',
		msg:'Welcome to the party'
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title:'About'
	});
});

app.get('/bad',(req,res)=>{
	//res.send('<h1>Hi</h1>');
	res.send({
		name:'error'
	});
});

app.listen(port,()=>{
	console.log(`Up at ${port}`);
});
