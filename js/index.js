let inputDir={x: 0,y: 0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let speed=7;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x :13,y: 15}
]
let food= {x : 6,y: 7}
let s=document.getElementById("scoreBox");

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return ;
    } 
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(sarr){
    for(let i=1;i<sarr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
          return true;
        }
        }
        if(snakeArr[0].x<=0||snakeArr[0].x>=18||snakeArr[0].y<=0||snakeArr[0].y>=18)
        {
             return true;
        }
        return false;
 
}
 function gameEngine(){
    //Part 1: Updating the Snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x: 0,y: 0};
        alert("Game Over. Press any key to play again");
        snakeArr=[
            {x :13,y: 15}
        ];
        // musicSound.play();
        score=0;
        s.innerHTML=score;
    }

    //if snake has eaten the food increment the score and  regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodSound.play()
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highScoreBox.innerHTML=highscoreval;
        }
        s.innerHTML=score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y});
        let a = 2;
        let b =16;
        let c=true;
        while(c){
        food={x: Math.round(a + (b-a)* Math.random()),y :  Math.round(a + (b-a)* Math.random()) }
        c=false;
        for(let i=0;i<snakeArr.length;i++){
            if(snakeArr[i].x==food.x&&snakeArr[i].y==food.y){
              c=true;
              break;
            }
            }
        }

    }
    
    //Moving The snake

    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1].x=snakeArr[i].x;
        snakeArr[i+1].y=snakeArr[i].y;
    }
    snakeArr[0].x=snakeArr[0].x+inputDir.x;
    snakeArr[0].y=snakeArr[0].y+inputDir.y;
    //Part 2: Display the Snake and Food
    //Display the Snake
   
    board.innerHTML= "";
    snakeArr.forEach((e,index)=>{
         snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
       
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // Display the Food
   
    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
     board.appendChild(foodElement);
     }

//Main Logic Starts Here
let highscoreval=localStorage.getItem("highscore");
if(highscoreval===null){
    let highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highScoreBox.innerHTML=highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x: 0,y: 1};
    //   moveSound.play();
      switch (e.key) {
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            inputDir.x= 1;
            inputDir.y= 0;
            break;
      
        default:
            break;
      }
});

