//author dmmonster
//start variables
let numberOfCards = 20;
const data = ["A","B","C","D","E","F","G","H","I","J"];
let clicked_card = new Array();
let clickDisabled = false;

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".timer>button").addEventListener("click",function(){startGame();});
    function startGame(){
        let newGame = new Game(data);
        let gameControl=new GameControl(numberOfCards);
        let cardCollection = document.querySelectorAll(".card");
        for(let i = 0; i<cardCollection.length;i++){
          cardCollection[i].addEventListener("click",function(){gameControl.rotateCard(this);});
        }
         gameControl.generateTimer();
    }

   
});

class Game{
    constructor(data){
        this.generateGame();
        this.shakeInsertText(data);
    }
    generateGame(){
        let gameSpace = document.getElementById("gamecontainer");
        for(let i = 0;i<data.length*2;i++){
            let one_card = document.createElement("div");
            let new_card = gameSpace.appendChild(one_card);
            new_card.setAttribute("class","card");
            let card_text=document.createElement("span");
            let new_card_text = new_card.appendChild(card_text);
            new_card_text.setAttribute("class","card-text");
        } 
    }
    shakeInsertText(data){
        let text_card_collection=document.querySelectorAll("div>.card-text");
        let text_card_collection_array=new Array();
        for(let i = 0;i<text_card_collection.length;i++){
            text_card_collection_array.push(text_card_collection[i]);
        }
        let data_length = data.length;
        for(let i = 0;i<data_length;i++){
           data.push(data[i]);
        } 
        let range_random=data_length*2;
        for(let i=data_length*2-1;i>=0;i--){
           let random_number=Math.floor(Math.random()*range_random);
           text_card_collection_array[random_number].innerHTML=data[i];
           data.splice(i,1);
           text_card_collection_array.splice(random_number,1);
           range_random--;
        }
    }
    

}


class GameControl{
    constructor(cardsOnTheBoard){
        this.intervalTimer = 0;
        this.cardsOnTheBoard=cardsOnTheBoard;
        this.counter = 0;
        console.log("cardsOnTheboard",this.cardsOnTheBoard);
        
    }
    rotateCard(obj){
        if(clickDisabled !== true){
           if(this.counter<0)this.counter++;

            if (!obj.classList.contains("cardanimation2")&&!obj.classList.contains("cardanimation1")){
                obj.classList.toggle("cardanimation1"); 
                clicked_card.push(obj);    
                console.log("clicked"+clicked_card);
                this.counter++;
                console.log(this.counter);
            }else if(obj.classList.contains("cardanimation1")){
                obj.classList.toggle("cardanimation1");
                obj.classList.toggle("cardanimation2"); 
                clicked_card.pop();
                console.log("clicked"+clicked_card);
                this.counter--;
                console.log(this.counter);
            }else{
                obj.classList.toggle("cardanimation1");
                obj.classList.toggle("cardanimation2"); 
                clicked_card.push(obj);    
                console.log("clicked"+clicked_card);
                this.counter++;
                console.log(this.counter);   
            }

            if(this.counter === 2){
                clickDisabled=true;
                this.counter = 0;
                this.check_card(clicked_card);
                console.log("clicked"+clicked_card);
            } 
        } 
    }
    
    check_card(clicked_card){
    let prev=clicked_card[0];
    let obj=clicked_card[1];
    if(prev.innerText === obj.innerText){
        prev.classList.add("good_checked");
        obj.classList.add("good_checked");
        prev.classList.remove("cardanimation1");
        obj.classList.remove("cardanimation1");
        clicked_card.pop();
        clicked_card.pop();
        clickDisabled=false;
        if( this.cardsOnTheBoard <= 2){
            this.cardsOnTheBoard-=2;
        }else{
            this.stopTimer();
        }
    }else{
        setTimeout(function(){
            for(let i = 0;i<clicked_card.length;i++){
                clicked_card[i].classList.remove("cardanimation1");
                clicked_card[i].classList.add("cardanimation2");
            }
                clicked_card.pop();
                clicked_card.pop();
                clickDisabled = false;
        },700);
        console.log("Error:prev-"+prev.innerText+" current-"+obj.innerText);
     }      
    }
    
    generateTimer(){
        let timerSpace = document.createElement("div");
        timerSpace.innerHTML="0:0";
        let startButton = document.querySelector(".timer>button");
        let timerNode = document.querySelector(".timer");
        timerNode.replaceChild(timerSpace,startButton);
        this.startTimer(document.querySelector(".timer>div"));
    }
    startTimer(timerNode){
        let seconds;
        let minutes= 0;
        let time;
        this.intervalTimer = setInterval(function(){            
           time = timerNode.innerText;
           time = time.split(":");
           time[1] = parseInt(time[1]);
           if(time[1]===59){
               time[1] = 0;
               time[0] = parseInt(time[0]);
               time[0]++;
           }else{
               time[1]++;             
           }
           timerNode.innerText=time[0]+":"+time[1];
        },1000);
    }
    stopTimer(){
        clearInterval(this.intervalTimer);
    }
}
