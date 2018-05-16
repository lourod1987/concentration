const $cards = $('.deck li');
const $back = $('.deck li i');
let moves = 0;
//$back.hide();

$(document).ready( () => {
  shuffle();
  
  const $front = $('.deck li span');
  
  $front.addClass("default");
  $front.css("color", "white");
//  $front.hide();
  
  
  //card flip
  $('.deck li').click( (evt) => {
    let cur = evt.currentTarget;
    $(cur).find("i").toggle();
    $(cur).find("span").toggle();
    $(cur).addClass("selected");
    moves++;
    
    const $selection = $('.selected');
    $('.count').remove();
    $('.moves').prepend('<span class="count">' + moves + '</span>');
    
    
//    setTimeout(function lock() {
//      if ($selection.length === 2) {
//        $('.card').addClass("lock");
//      } 
//      if ($selection.length < 2) {
//        $('.card').removeClass("lock");
//      }
//      console.log($selection.length);
//    }, 100);
    
    
    //selection check
     setTimeout(function check() {
        if ($selection.length > 1) {
          let select1 = $selection[0].textContent;
          let select2 = $selection[1].textContent;

          if (select1 === select2) {
            $('.selected').addClass('correct');
            $('.selected').addClass('correct');
            $('li.card.correct span').removeClass('default');
            $('li.card').removeClass('selected');
          } else {
            $('.deck li').removeClass("selected");
            $('.default').hide();
            $('.default').prev().show();
            $('li.card').removeClass('selected');
          }
        }
     }, 600);
    
    
  });
  
  setInterval(function win() {
    if ($('li.card.correct').length >= 2) {
      const $win = $('.correct');
      
      if ($win.length === 16) {
        alert("You win!");
        reset();
      }
    }
  }, 500);
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
  let copy = shuffleDeck.slice(0);
  let currentI = copy.length;
  let num = 0;
  
  while (currentI > 0) {
    let rand = Math.floor(Math.random() * currentI);
    
//    console.log('random num: ' + rand); //current random interger
//    console.log(`rand card: ${shuffleDeck[rand]}`); //selected span by rand
    $($cards[num]).append(copy[rand]);
//    console.log($cards[num]); //selected card slot
    copy.splice(rand, 1);
//    console.log(`current deck: 
//    ${shuffleDeck}`); //what the shuffleDeck array looks like after splice
    currentI--;
    num++;
  }
}

function reset() {
  moves = 0;
  $('.count').remove();
  $('.moves').prepend('<span class="count"> - </span>');
  $('li.card').removeClass("correct");
  $('.deck li.card').find("span").remove();
  shuffle();
  $('.deck li span').addClass("default");
  $('.deck li span').css("color", "white");
  $back.show();
}