//require dotenv for password files
require('dotenv').config()
 //set up dependencies
var express = require('express');
//assign var to express function
var app = express();
const db = require('./db/db_configuration');



//require middleware
var bodyParser= require("body-parser");
var morgan= require("morgan");

//use the middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("short"));
app.use(express.static('public'))


console.log(db.DATABASE_HOST)

//handle request with routes
//add all routes indiv then refactor after.
//add in error status and content type and send data or response to webpage

//reg drinks
app.get('/api/bartender', function(req, res){
    db.query('SELECT * FROM bartender;', function(err, data){
        if(err){
            console.log(err);
            
        }else{
    res.json(data.rows);
    }})
    
})
//alcoholic drinks
app.get('/api/drinks', function(req, res){
    db.query('SELECT * FROM drinks;', function(err, data){
        console.log(typeof data);
    res.json(data.rows);
    })
    
})
//reg drinks by id
app.get('/api/bartender/:id', function(req, res){
    //extract the last segment of the url
    //put last segment into parsed data
    var id= Number.parseInt(req.params.id);
    db.query(`SELECT * FROM bartender WHERE ID= $1;`,[id], function(err, data){
        res.json(data.rows);
        })       
})
//alc drinks by id
app.get('/api/drinks/:id', function(req, res){
    //extract the last segment of the url
    //put last segment into parsed data
    var id= Number.parseInt(req.params.id);
    db.query(`SELECT * FROM drinks WHERE ID= $1;`,[id], function(err, data){
        res.json(data.rows);
        })       
})
//Post request
//reg drinks post name type
app.post('/api/bartender', function(req, res){
    //console.log(req.body);
    db.query('INSERT INTO bartender(name, quote, drinkID) VALUES ($1, $2, $3);', [req.body.name, req.body.quote, req.body.drinkID], function(err, data){
        if(err){
        console.log(err)
        }else{
            db.query('SELECT * FROM bartender WHERE ID=(SELECT max(ID) FROM bartender);', function(err, data){
                res.json(data.rows);
                })
            
            
           
    }
        })
})
// drinks post name type
app.post('/api/drinks', function(req, res){
    //console.log(req.body);
    db.query('INSERT INTO drinks(name, type, image, link) VALUES ($1, $2, $3, $4);', [req.body.name, req.body.type, req.body.image, req.body.link], function(err, data){
        if(err){
        console.log(err)
        }else{res.send("great job john posted new drink");
    }
        })
})
    //Puts request update all fields
//puts reg drink
app.put('/api/bartender/:id', (req, res)=>{
    var id= Number.parseInt(req.params.id);  
    var name = req.body.name;
    var quote = req.body.quote; 
    var drinkID= req.body.drinkID;
    
       //kind update
        db.query('UPDATE regular SET name= $1, quote= $2, drinkID= $3 WHERE ID= $4;', [name, quote, drinkID, id], function(err, data){
        if(err) {
            console.log(err)
        }else{
            res.send(`good job john updated ${id}`);
        }
        }) // name update
    
})
//puts drink
app.put('/api/drinks/:id', (req, res)=>{
    var id= Number.parseInt(req.params.id);  
    var name = req.body.name;
    var type = req.body.type; 
    var image = req.body.image;
    var link = req.body.link;
    
       //kind update
        db.query('UPDATE regular SET name= $1, type= $2, image= $3, link= $4 WHERE ID= $5;', [name, type, image, link, id], function(err, data){
        if(err) {
            console.log(err)
        }else{
            res.send(`good job john updated ${id}`);
        }
        }) // name update
    
})
    //patch request
// patch reg drinks
app.patch('/api/bartender/:id', function(req, res){
    //var for id entered as the data[id] read parse data
    var id= Number.parseInt(req.params.id);  
    var name = req.body.name;
    var quote = req.body.quote;
    var drinkID = req.body.drinkID; 
    

    //quote update
    if(typeof name === "undefined" && typeof quote === "string" && typeof drinkID === "undefined"){     
    db.query('UPDATE bartender SET quote=$1 WHERE ID=$2;', [quote, id], function(err, data){
        if(err) {
            console.log(err)
        }else{
            res.send('good job john updated quote');
        }
        }) // name update
    } else if(typeof name === "string" && typeof quote === "undefined" && typeof drinkID === "undefined"){     
        db.query('UPDATE bartender SET name=$1 WHERE ID=$2;', [name, id], function(err, data){
            if(err) {
                console.log(err)
            }else{
                res.send('good job john updated name');
            }
            })// drinkID update
    } else if(typeof name === "undefined" && typeof quote === "undefined" && typeof drinkID === "string"){     
        db.query('UPDATE bartender SET drinkID=$1 WHERE ID=$2;', [name, id], function(err, data){
            if(err) {
                console.log(err)
            }else{
                res.send('good job john updated drinkID');
            }
            })//name and quote update
    }else if(typeof name === "string" && typeof quote === "string" && typeof drinkID === "undefined"){     
        db.query('UPDATE bartender SET name=$1, quote= $2 WHERE ID=$3;', [name, quote, id], function(err, data){
            if(err) {
                console.log(err)
            }else{
                res.send('good job john updated name and quote');
            }
            })// quote and drinkID update
    }else if(typeof name === "undefined" && typeof quote === "string" && typeof drinkID === "string"){     
        db.query('UPDATE bartender SET quote=$1, drinkID= $2 WHERE ID=$3;', [quote, drinkID, id], function(err, data){
            if(err) {
                console.log(err)
            }else{
                res.send('good job john updated quote and drinkID');
            }
            })// name and drinkID update
    }else if(typeof name === "string" && typeof quote === "undefined" && typeof drinkID === "string"){     
        db.query('UPDATE bartender SET name=$1, drinkID= $2 WHERE ID=$3;', [name, drinkID, id], function(err, data){
            if(err) {
                console.log(err)
            }else{
                res.send('good job john updated name and drinkID');
            }
            })
    }else{
        res.send("didnt work");
    }          
})

//patch alc drinks
app.patch('/api/drinks/:id', function(req, res){
        //var for id entered as the data[id] read parse data
        var id= Number.parseInt(req.params.id);  
        var name = req.body.name;
        var type = req.body.type; 
        var image = req.body.image;
        var link = req.body.link;        

        //type update
        if(typeof name === "undefined" && typeof type === "string" && typeof image === "undefined" && typeof link === "undefined"){     
        db.query('UPDATE drinks SET kind=$1 WHERE ID=$2;', [type, id], function(err, data){
            if(err) {
                console.log(err)
            }else{
                res.send('good job john updated type');
            }
            }) // name update
        } else if(typeof name === "string" && typeof type === "undefined" && typeof image === "undefined" && typeof link === "undefined"){     
            db.query('UPDATE drinks SET name=$1 WHERE ID=$2;', [name, id], function(err, data){
                if(err) {
                    console.log(err)
                }else{
                    res.send('good job john updated name');
                }
                })//image update
        } else if(typeof name === "undefined" && typeof type === "undefined" && typeof image === "string" && typeof link === "undefined"){     
            db.query('UPDATE drinks SET image=$1 WHERE ID=$2;', [image, id], function(err, data){
                if(err) {
                    console.log(err)
                }else{
                    res.send('good job john updated image');
                }
                })//link update
        }else if(typeof name === "string" && typeof type === "undefined" && typeof image === "undefined" && typeof link === "undefined"){     
            db.query('UPDATE drinks SET link=$1 WHERE ID=$2;', [link, id], function(err, data){
                if(err) {
                    console.log(err)
                }else{
                    res.send('good job john updated link');
                }
                })
        }else{
            res.send("didnt work");
        }          
})

//delete reg drink
app.delete('/api/bartender/:id', function(req, res){
    var id= Number.parseInt(req.params.id);
    db.query('DELETE FROM bartender WHERE ID= $1;',[id], function(err, data){
        if(err){
            console.log(err);
        }else{
        res.send(`great job john deleted bartender ${id}`);
        }
        })             
        
})

//delete alc drink
app.delete('/api/drinks/:id', function(req, res){
    var id= Number.parseInt(req.params.id);
    pool.query('DELETE FROM drinks WHERE ID= $1;',[id], function(err, data){
        if(err){
            console.log(err);
        }else{
        res.send(`great job john deleted drink ${id}`);
        }
        })             
        
})

 //listen on a port
app.listen(process.env.PORT || 3000, function(){
    console.log('server is running on 3000');
})
module.exports= app;
