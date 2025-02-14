const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
// to generate random time for mole b/w min and max
function randomTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
}
// select random hole
function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
        return randomHole(holes); // jise same hole na select ho 
    }
    lastHole = hole;
    return hole;
}
// peeking mole out of random hole
function peep(){
    const time = randomTime(400, 1500);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep(); // jabtak time up nahi hua hai tabtak peeping chalega
    }, time);
}



// to start the game
function startGame(){
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() =>{ timeUp = true;
    alert('Game Over! Your score is ' + score);
 } ,10000);
}
// to whack the mole
function whack(e){
    if(!e.isTrusted) return; // cheater check
    score++;
    this.parentNode.classList.remove('up'); // to hide after whacking    
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click',whack));