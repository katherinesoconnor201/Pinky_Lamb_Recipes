const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.canvas.width = window.innerWidth - 100;
ctx.canvas.height = window.innerHeight - 10;
const intro = document.getElementById("intro");
let box = cvs.height / 12;
const rx_max = Math.floor(cvs.width / box) - 1;
const ry_max = Math.floor(cvs.height / box) - 3;
let health = 10;
let num_showing = 0;
let num_spaces = 0;
let speed = 1;
let game_over = "";
let t = 0;
let keepPlaying = true;
let score = 0;
let tile = [];

var word = "word";
word = word.toUpperCase();
var ltrs = word.split('');
let wrong_ltrs = new Set();

const PlayAgain = document.getElementById("PlayAgain");
const ShowAnswer = document.getElementById("ShowAnswer");
PlayAgain.style.left = cvs.width / 2 + "px";
PlayAgain.style.top = cvs.height / 2 + 4*box + "px";
ShowAnswer.style.left = cvs.width / 2 - 4*box + "px";
ShowAnswer.style.top = cvs.height / 2 + 4*box + "px";
ShowAnswer.style.display = "block";
/*
tile[0] = {
  x: 2 * box,
  y: cvs.height / 2 + box,
  str: ltrs[0],
  width: box,
  height: box,
  show: false
}*/

function newTile(i) {
  var sp = ltrs[i] === " ";
  var newtile = {
    x: box + i * box,
    y: cvs.height / 2 + box,
    str: ltrs[i],
    width: box,
    height: box,
    show: false,
    space: sp
  }
  tile.push(newtile);
}

document.addEventListener("onload", newWord);
function newWord() {
  randomWord();
  word = word.toUpperCase();
  ltrs = word.split('');
  for (var k = 0; k < ltrs.length; k++) {
    newTile(k);
  }
}
var Stuffed_Animals = ["Pinky Lamb" , "Bear", "Big Bear", "Homework Bear", "Florida Bear", "Pinky Bear", "Pinky Lamb Jr", "Teddy",
"Sealy", "Fluff"];
var US_States = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", 
"florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky","louisiana", "maine", 
"maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", 
"new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma",
 "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", 
 "virginia", "washington", "west virginia", "wisconsin", "wyoming"];
function randomWord() {
  var textByLine = US_States
  var r = Math.floor(Math.random() * textByLine.length);
  word = textByLine[r];
  word = word.toUpperCase();
  var ltrs = word.split('');
}

function Win() {
  ctx.fillStyle = "white";
  ctx.font = "bold 100px Courier"
  ctx.fontsize = 2 * box + "px";
  ctx.fillText("WINNER!", cvs.width / 4, cvs.height / 2);
  ctx.strokeStyle = "black"
  ctx.strokeText("WINNER!", cvs.width / 4, cvs.height / 2);
  PlayAgain.style.display = "block";
}

function Game_Over() {
  ctx.fillStyle = "white";
  ctx.font = "bold 100px Courier"
  ctx.fontsize = 2 * box + "px";
  ctx.fillText("GAME OVER", cvs.width / 4, cvs.height / 2);
  ctx.strokeStyle = "black"
  ctx.strokeText("GAME OVER", cvs.width / 4, cvs.height / 2);
  PlayAgain.style.display = "block";
}

function Show_Answer(){
  for (let i = 0; i < tile.length; i++) {
    tile[i].show = true;
  }
}

function playAgain() {
  if (num_showing == tile.length - num_spaces) {
    score++;
  }
  tile = [];
  newWord();
  health = 10;
  t = 0;
  //keepPlaying = true;
  btn.style.display = "none";
}

document.addEventListener("keydown", clearIntro);
function clearIntro() {
  intro.textContent = "";
  intro.style.borderStyle = "none";
  intro.style.boxShadow = "none";
}

//User Controls
document.addEventListener("keyup", k_up);

function k_up(event) {
  let k = event.keyCode;
  let ltr = String.fromCharCode(k);
  console.log(ltr)
  let correct = false;
  for (let i = 0; i < tile.length; i++) {
    if (ltr == tile[i].str) {
      tile[i].show = true;
      correct = true;
    }
  }
  if (correct == false) {
    health--;
    wrong_ltrs.add(ltr);
  }
}

newWord();

function draw() {
  ctx.canvas.width = window.innerWidth - 100;
  ctx.canvas.height = window.innerHeight - 10;
  box = cvs.height / 12;
  //Background
  ctx.fillStyle = "#2f5e31";
  ctx.fillRect(0, 0, cvs.width, box);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, cvs.width, box);
  ctx.fillStyle = "black";
  ctx.fillRect(0, box, cvs.width, cvs.height - box);
  ctx.strokeRect(0, box, cvs.width, cvs.height - box);

  num_showing = 0;
  num_spaces = 0;
  //Tiles
  for (let i = 0; i < tile.length; i++) {
    if (tile[i].space == false) {
      ctx.fontsize = box * 0.8 + "px";
      ctx.fillStyle = "white";
      ctx.fillRect(tile[i].x + box/10, tile[i].y + box, tile[i].width - 2*box/10, box/10);
      /*ctx.strokeStyle = "white";
      ctx.strokeRect(tile[i].x, tile[i].y, tile[i].width, tile[i].height);*/
      ctx.fillStyle = "white";
      ctx.font = "bold 45px Courier";
      if (tile[i].show) {
        ctx.fillText(tile[i].str, tile[i].x + tile[i].width / 4, tile[i].y + tile[i].height * 0.7);
        num_showing++;
      }
    }else{
      num_spaces++;
    }
  }

  if (num_showing == tile.length - num_spaces) {
    Win();
  }

  //Score Display
  ctx.fillStyle = "white";
  ctx.font = "bold 40px Courier"
  ctx.fontsize = 0.8 * box + "px";
  ctx.fillText("Score: " + score, box, .8 * box);
  ctx.fillText("Lives: " + health, box * 9, .8 * box);
  intro.style.left = cvs.width / 2 - 4 * box + "px";

  if (health <= 0) Game_Over();
  console.log(health);
}
//window.requestAnimationFrame(draw);
timer = setInterval(draw, 20);