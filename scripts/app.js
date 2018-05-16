const $cards = $('.deck li');
const $back = $('.deck li i');
let click = 0;
let moves = 0;
//$back.hide();

$(document).ready( () => {
  shuffle();
  
  const $front = $('.deck li span');
  
  $cards.css("background-color", "red");
  $front.css("color", "white");
  $front.hide();
  
  
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
});

let shuffleDeck = [
  '<span>Phoenix</span>',
  '<span>Phoenix</span>',
  '<span>Dragon</span>',
  '<span>Dragon</span>',
  '<span>Pegasus</span>',
  '<span>Pegasus</span>',
  '<span>Golem</span>',
  '<span>Golem</span>',
  '<span>Siren</span>',
  '<span>Siren</span>',
  '<span>Hydra</span>',
  '<span>Hydra</span>',
  '<span>Elf</span>',
  '<span>Elf</span>',
  '<span>Dwarf</span>',
  '<span>Dwarf</span>'
];

function shuffle() {
  let currentI = shuffleDeck.length;
  let num = 0;
  
  while (currentI > 0) {
    let current = shuffleDeck[currentI];
    let rand = Math.floor(Math.random() * currentI);
    
    console.log('random num: ' + rand);
    console.log(`rand card: ${shuffleDeck[rand]}`);
    $($cards[num]).append(shuffleDeck[rand]);
    console.log($cards[num]);
    shuffleDeck.splice(rand, 1);
//    console.log(`current deck: 
//    ${shuffleDeck}`);
    currentI--;
    num++;
  }
}