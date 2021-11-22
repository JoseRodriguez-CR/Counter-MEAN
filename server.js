const express = require( 'express' );
const app = express();
// new code:
const session = require('express-session');

// more new code:
app.use(session({
    secret: 'codingdojorocks',
    resave: false,
    saveUninitialized: true
}));  // string for encryption

//INSTRUCTING TO THE SERVER WHERE WILL PLACED THE EJS FILES
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );



app.get('/', function (request, response){
    // set the name property of session.  
    if(request.session.counter == null){
        request.session.counter = 0;
    }
    else {
        request.session.counter += 1;
    }
    console.log(request.session.counter);
    // render the counter back to the root route using Index.ejs 
    response.render('index', {counter : request.session.counter} );
});

app.get("/add", function(request, response){
    request.session.counter += 1;
    console.log(request.session.counter);
    response.redirect("/");
});

app.get("/reset", function(request, response){
    request.session.counter = null;
    response.redirect("/");
});


app.listen(8000, function(){
    console.log("Listening on port: 8000");
})