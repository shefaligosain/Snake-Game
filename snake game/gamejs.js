//game constants and variables
let inputDir = {x:0 , y:0};
const gamemusic = new Audio('music.mp3');
const gameover = new Audio('gameover.mp3');
const gamefood = new Audio('food.mp3');
const gamemove = new Audio('move.mp3');
let speed=7;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13 , y:15}];
let food={x:3 , y:5};

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
   //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameengine();
}

function isCollide(sar){
//if you bump into yourself
for (let j = 1; j < snakeArr.length; j++) {
  if(sar[j].x === sar[0].x && sar[j].y === sar[0].y) {
      return true;
  }   
}
//if you bump into the wall
if(sar[0].x<=0 || sar[0].x>=18 || sar[0].y<=0 || sar[0].y>=18 ){
    return true;
}
return false;
}

function gameengine(){
    //Updating the snake array and food
    if(isCollide(snakeArr)){
        gamemusic.pause();
        gameover.play();
        alert("GAME OVER!!Press OK to restart the game!!");
        snakeArr=[{x:13 , y:15}];
        score=0;
      //  gamemusic.play();
    }

//if the snake has eaten the food , then regenerate the food and increment the score
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        gamefood.play(); 
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            Highscorebox.innerHTML = "High Score: " + hiscoreval;
        }
        scorebox.innerHTML="Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //move the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //display snake
    path.innerHTML="";
    snakeArr.forEach((e,index)=>{
    snakeElement= document.createElement('div');
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index === 0){
    snakeElement.classList.add('head');}
    else{
        snakeElement.classList.add('snake');    
    }
    path.appendChild(snakeElement);
    

    })
//display food

    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    path.appendChild(foodElement);
    
}






//game logic
//gameover.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    Highscorebox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    gamemove.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});