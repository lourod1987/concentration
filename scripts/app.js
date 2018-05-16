const $front = $('.deck li span');
const $back = $('.deck li i');
let click = 0;
let moves = 0;
// $deck.hide();
$back.hide();

$(document).ready( () => {
  shuffle();
  $front.css("background-color", "red");
  
});

let shuffleDeck = [];

function shuffle() {
  let currentI = $front.length;
  
  while (currentI >= 0) {
    let current = $front[currentI];
    let temp;
    
    let rand = Math.floor(Math.random() * currentI);
    currentI -= 1;
    temp = current;
    current = rand;
    rand = temp;
//    console.log(current);
  }
}

console.log($front[3]);



//card flip
$('.deck li').click( (evt) => {
  let cur = evt.currentTarget;
  $(cur).find("i").toggle();
  $(cur).find("span").toggle();
  click ++;
  
  if (click > 2) {
    $front.hide();
    $back.show();
    click = 0;
  }
});

