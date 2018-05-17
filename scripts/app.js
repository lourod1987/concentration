$(document).ready( () => {
  const $cards = $('.deck li');
  const $back = $('.deck li i');
  let moves = 0;
  const shuffleDeck = [
    '<span><img src="../imgs/phoenix_noun_cc.svg">Phoenix</span>',
    '<span><img src="../imgs/phoenix_noun_cc.svg">Phoenix</span>',
    '<span><img src="../imgs/dragon_noun_cc.svg">Dragon</span>',
    '<span><img src="../imgs/dragon_noun_cc.svg">Dragon</span>',
    '<span><img src="../imgs/pegasus_noun_cc.svg">Pegasus</span>',
    '<span><img src="../imgs/pegasus_noun_cc.svg">Pegasus</span>',
    '<span><img src="../imgs/golem_noun_cc.svg">Golem</span>',
    '<span><img src="../imgs/golem_noun_cc.svg">Golem</span>',
    '<span><img src="../imgs/siren_noun_cc.svg">Siren</span>',
    '<span><img src="../imgs/siren_noun_cc.svg">Siren</span>',
    '<span><img src="../imgs/hydra_noun_cc.svg">Hydra</span>',
    '<span><img src="../imgs/hydra_noun_cc.svg">Hydra</span>',
    '<span><img src="../imgs/elf_noun_cc.svg">Elf</span>',
    '<span><img src="../imgs/elf_noun_cc.svg">Elf</span>',
    '<span><img src="../imgs/dwarf_noun_cc.svg">Dwarf</span>',
    '<span><img src="../imgs/dwarf_noun_cc.svg">Dwarf</span>'
  ];
  
  const score = [
    '<li>*</li>',
    '<li id="second">*</li>',
    '<li id="third">*</li>',
    '<li id="fourth">*</li>',
    '<li id="fifth">*</li>'
  ];
//$back.hide();
  
  function shuffle() {
  let copy = shuffleDeck.slice(0); //make copy of shuffleDeck array
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
  $('li.card').removeClass('selected');
  $('.deck li.card').find("span").remove();
  shuffle();
  $('.deck li span').addClass("default");
  $('.deck li span').css("color", "white");
  $back.show();
  $('.rating li').remove();
  $('.rating').append(score);
}
  
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
          let correct1 = $selection[0];
          let correct2 = $selection[1]

          if (select1 === select2) {
            $(correct1).addClass('correct');
            $(correct2).addClass('correct');
            $('li.card.correct span').removeClass('default');
            $('li.card').removeClass('selected');
          } else {
            $('.selected').addClass("incorrect");
            $('.deck li').removeClass("selected");
            $('.default').hide();
            $('.default').prev().show();
            $('li.card').removeClass('selected');
          }
        }
     }, 600);
    
    
  });
  
  setInterval(function win() {
    $('li.card').removeClass("incorrect");
    if ($('li.card.correct').length >= 2) {
      const $win = $('.correct');
      
      if ($win.length === 16) {
        let $rating = $('.rating');
        console.log($rating);
        alert("You win! Your rating is: " + $rating);
        reset();
      }
    }
  }, 500);
  
  setInterval(function scoreCheck() {
    if (moves > 24) {
      $('#fifth').remove();
    }
    
    if (moves > 32) {
      $('#fourth').remove();
    }
    
    if (moves > 40) {
      $('#third').remove();
    }
    
    if (moves > 48) {
      $('#second').remove();
    }
  }, 100);
  
  $('.reset').click( (evt) => {
    reset();
  });
});