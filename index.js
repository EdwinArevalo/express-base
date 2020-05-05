const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');

function logger(req, res, next){
    console.log(`Route receivied ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(express.json());//necesario para trabajar con json
app.use(morgan('dev'));

app.all('/about',((req, res, next)=>{
    console.log('passed');
    next();
}));

app.get('/',(req, res)=>{
    res.send('Home');
});

app.get('/about',(req, res)=>{
    fs.readFile('./index.html',(err, html)=>{
        res.write(html);
        res.end();
    });
});

app.get('/json',(req, res)=>{
    res.json({
        
        'name' : "ewas",
        'edad' : 18
    
    }); 
});

app.post('/user/:id',(req, res)=>{
    //console.log(req.params);
    console.log(req.body);
    res.send(`user ${req.params.id} inserted`);
});



app.listen(3000, ()=>{
    console.log('Sever on port 3000');
});