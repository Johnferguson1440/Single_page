





//ajax get to grab all of the bartenders names have this load on pageload
$(document).ready(function() {   
    //function getBartenders(){
        $.ajax({
            type: 'GET',
            url: 'https://calm-chamber-49755.herokuapp.com/api/bartender',
            connection: 'Keep-Alive',
            success: function(data){ 
                $('#names').find('span').remove();
                let parsed = JSON.parse(data);
                for(var i=0; i<parsed.length; i++){
                    let name= parsed[i].name;
                    let quote =parsed[i].quote;            
                    let drinkID = parsed[i].drinkid;
                    let id = parsed[i].id;
                    $('#names').append(`<div id = "${id}" class="bartender" title= "${drinkID}">
                    <h2> ${name}</h2>
                    <h3>Favorite quote: "${quote}"</h3></div>`)
                }      
                
            }
            
        })
        
        
        $.ajax({
            type: 'GET',
            url: 'https://calm-chamber-49755.herokuapp.com/api/drinks',
            connection: 'Keep-Alive',
            success: function(data){ 
                let drinklist=[]
                let parsed = JSON.parse(data);
                for(var i =0; i <parsed.length; i++){
                    let name= parsed[i].name;
                    let type= parsed[i].type;
                    let image= parsed[i].image;
                    let link = parsed[i].link;
                    let id= parsed[i].id;
                    let numberD = {drink:name, id:id};
                    drinklist.push(numberD);
                }
                
                $('#post').append(`<div id="drinklist"><ul id="here"></ul></div>
                <form class="wrapper">  
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"></input>
                <label for="quote">Favorite Quote:</label>
                <input type="text" id="Quote" name="quote"></input>
                <label for="drinkID">DrinkID:</label>
                <input type="text" id="drinkID" name="drinkID"></input>                       
                
                <button id="submit" class="add">ADD Bartender!</button></form>`);
                
                for(var x = 0; x<drinklist.length;x++){
                    
                    
                    $('#here').append(`<li>${drinklist[x].id}-${drinklist[x].drink}</li>`)
                }
                            $('#submit').click( function(event){ 
                                event.preventDefault();
                                console.log("clicked");
                                 addBar()  
                                    })      
                
            }})        
            
            
            //event handler for click
                    
            
            
            //post new bartender
            function addBar(){
                let name = $('#name').val()
                let quote = $('#Quote').val()
                let drinkID =  $('#drinkID').val()
                
                $.ajax({
                    type: 'POST',
                    url: 'https://calm-chamber-49755.herokuapp.com/api/bartender',
                    connection: 'Keep-Alive',
                    data: {'name':name, 'quote':quote, 'drinkID':drinkID},
                    dataType: "text",
                    success: function(data){ 
                        //console.log(data);
                        let parsed = JSON.parse(data);
                        //console.log(parsed);
                        
                        let name= parsed[0].name;
                        let quote =parsed[0].quote;            
                        let drinkID = parsed[0].drinkid;
                        let id = parsed[0].id;
                        $('#names').append(`<div id = "${id}" class="bartender" title= "${drinkID}">
                        <h2> ${name}</h2>
                        <h3>Favorite quote: "${quote}"</h3></div>`)
             
                        
                    }
                    
})}




//ajax call to get drinks
function getDrinks(){
    $.ajax({
        type: 'GET',
        url: 'https://calm-chamber-49755.herokuapp.com/api/drinks',
        connection: 'Keep-Alive',
        success: function(data){ 
            for(var i =0; i <data.length; i++){
                let name= data[i].name;
                let type= data[i].type;
                let image= data[i].image;
                let link = data[i].link;
            }

}})}

//ajax get to grab specific bartender drink 
//need a way to grab the drink id and pass it into the url field
$('#names').on('click', '.bartender',function(){
    let currentID = this.id;
    let  currentTitle= this.title;
  
    getBartenderDrink(currentID, currentTitle)
  })

  function getBartenderDrink(id,drink){
    $.ajax({
        type: 'GET',
        url: 'https://calm-chamber-49755.herokuapp.com/api/drinks/'+drink,
        connection: 'Keep-Alive',
        success: function(data){ 
           //if success then get the drink id and call on drinkID request function
                let name= data[0].name;
                let type= data[0].type;
                let image= data[0].image;
                let link = data[0].link;
                $('#main').find('.drink').remove();
                
                $(`#drink`).append(`<div id = "${id}" class="drink" title= "${drink}" >
                <h1> ${name}</h1>
                <img src="${image}">
                <a href="${link}">See Recipe</a></div>`)

           
        }
        
    })
    } 
})
  