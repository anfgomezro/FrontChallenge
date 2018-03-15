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
    a.classList.add('normal');
    a.setAttribute('href',myJSON.Menu[i].Link);
    li.appendChild(a);
    document.querySelector("ul").appendChild(li);
    if(myJSON.Menu[i].Submenu.length > 0){
        li.className = "dropdown";
        a.classList.add('dropbtn');
        var con = document.createElement("DIV");
        li.appendChild(con);
        con.className = "dropdown__content";
        li.addEventListener("click", function (){
            this.lastChild.style.display = 'block';
            this.firstChild.classList.remove('normal');
            this.firstChild.classList.add('onmyClick');
            document.getElementById('container--footer').style.background = 'rgba(100,0,0,0.5)';
            document.getElementById('trans').style.background = 'rgba(100,0,0,0.5)';
            document.getElementsByClassName('bigText')[0].style.filter = 'brightness(0.8)';
            });
        for(let j = 0; j < myJSON.Menu[i].Submenu.length; j++){
            var link = document.createElement("A");
            link.classList.add('normal');
            link.setAttribute('href',myJSON.Menu[i].Submenu[j].Link);
            var text2 = document.createTextNode(myJSON.Menu[i].Submenu[j].Name);
            link.appendChild(text2);
            con.appendChild(link); 
        }
    }
}

document.onclick = captura;

function captura(e){
    var hasclick;
    if(e == null){
        hasclick = e.target;
        console.log("ni mierdas")
    }else{
        hasclick = event.srcElement;
        if(!hasclick.classList.contains('dropbtn')){
            let list = document.getElementsByClassName('dropdown__content');
            for(let k = 0; k < list.length;k++ ){
                if(list[k].style.display == 'block'){
                    document.getElementById('container--footer').style.background = 'white';
                    document.getElementById('trans').style.background = 'rgba(0,0,0,0.5)';
                    document.getElementsByClassName('bigText')[0].style.filter = 'none';
                    list[k].parentElement.firstChild.classList.remove('onmyClick');
                    list[k].parentElement.firstChild.classList.add('normal');
                    list[k].style.display = 'none';
                }
            }
        }
    }
}




