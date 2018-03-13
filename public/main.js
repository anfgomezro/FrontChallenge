var state = 0;

function change(){
    if(state == 0){
        ocultarNav();
        state = 1;
    }else{
        mostrarNav();
        state = 0;
    }
}

function ocultarNav(){
    document.getElementById("nav").style.display = 'none';
    document.getElementById("searchText").style.display = 'inline';
}

function mostrarNav(){
    document.getElementById("nav").style.display = 'inline';
    document.getElementById("searchText").style.display = 'none';
}

fetch('/api/nav.json')
    .then( function (response) {
        return response.json();
    })  
    .then(function(myJSON) {
        console.log(myJSON);
        for(let i = 0; i < myJSON.Menu.length; i++){
            build(myJSON,i);
        }
    });

function build(myJSON,i){
    var text = document.createTextNode(myJSON.Menu[i].Name);
    var a = document.createElement("A");
    var li = document.createElement("LI");
    a.appendChild(text);
    li.appendChild(a);
    document.querySelector("ul").appendChild(li);
}



