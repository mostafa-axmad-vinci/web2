let timeoutID=5;
let compteur=0;
var tenSeconds;
let timer;
const btn1 = document.querySelector("#myBtn1");
const span = document.querySelector("span");


btn1.addEventListener("mouseover", startClock);
btn1.addEventListener("click",game);

function game(){
    if((tenSeconds<=timeoutID*1000) && compteur===10){
        clearTimeout(tenSeconds);
        let timefinish=new Date().getTime()- timer.getTime();
        span.innerHTML=`WINNER you did click 10 times within ${timefinish/1000}s!`;
        btn1.style.display='none'
        

    }
    compteur++;
}
function startClock(){
    tenSeconds=setTimeout(loss, timeoutID*1000);
     timer=new Date();

    




}

function loss(){

    let timefinish=new Date().getTime()- timer.getTime();
    btn1.style.display='none'
    span.innerHTML=`Game over, you did not click 10 times within ${timefinish/1000}s!
        You clicked ${compteur} times`;

}








