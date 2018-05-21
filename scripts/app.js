$(document).ready( () => {
  const $cards = $('.deck li');
  const $back = $('.deck li i');
  let $timeCount = $('.time-count').text();
  let moves = 0;
  let timer = [0, 0]
  let timeRunning = false;
  const shuffleDeck = [
    '<span><img src="../imgs/phoenix_noun_cc.svg">Phoenix</span>',
    '<span><img src="../imgs/phoenix_noun_cc.svg">Phoenix</span>',
    '<span><img src="../imgs/dragon_noun_cc.svg">Dragon</span>',
    '<span><img src="../imgs/dragon_noun_cc.svg">Dragon</span>',
    '<span><img src="../imgs/pegasus_noun_cc.svg">Pegasus</span>',
    '<span><img src="../imgs/pegasus_noun_cc.svg">Pegasus</span>',
    '<span><img src="../imgs/golem.svg">Golem</span>',
    '<span><img src="../imgs/golem.svg">Golem</span>',
    '<span><img src="../imgs/siren_noun_cc.svg">Siren</span>',
    '<span><img src="../imgs/siren_noun_cc.svg">Siren</span>',
    '<span><img src="../imgs/hydra.svg">Hydra</span>',
    '<span><img src="../imgs/hydra.svg">Hydra</span>',
    '<span><img src="../imgs/elf.svg">Elf</span>',
    '<span><img src="../imgs/elf.svg">Elf</span>',
    '<span><img src="../imgs/dwarf.svg">Dwarf</span>',
    '<span><img src="../imgs/dwarf.svg">Dwarf</span>'
  ];
  
  const score = [
    '<li><img src="../imgs/primary-star.svg"></li>',
    '<li id="second"><img src="../imgs/primary-star.svg"></li>',
    '<li id="third"><img src="../imgs/primary-star.svg"></li>',
    '<li id="fourth"><img src="../imgs/primary-star.svg"></li>',
    '<li id="fifth"><img src="../imgs/primary-star.svg"></li>'
  ];
  
  const emptyStar = ['<li><img src="../imgs/empty-star.svg"></li>'];
  
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
  
  shuffle();
  
  function leadingZero(time) {
    if (time <= 9) {
      time = "0" + time;
    }
    return time;
  }
  
      
function runTimer() {
//      if (!timeRunning) {
        timeRunning = true;
        timer[1]++;

        if (timer[1] > 59) {
          timer[1] = 0;
          timer[0]++;
        }

        $('.timer span').remove();
        $('.timer').append('<span>'+leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + '<span>');
//      }
  }
  
  const $front = $('.deck li span');
  $front.addClass("default");
  
  
  //card flip
  $('.deck li').click( (evt) => {
    setInterval(runTimer, 1000);
    
    let cur = evt.currentTarget;
    $(cur).find("i").toggle();
    $(cur).find("span").toggle();
    $(cur).addClass("selected");
    
    const $selection = $('.selected');
    
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
            moves++;
            $('.count').remove();
            $('.moves').prepend('<span class="count">' + moves + '</span>');
            setTimeout(win(), 650);
          } else {
            $('.selected').addClass("incorrect");
            $('.deck li').removeClass("selected");
            $('.default').hide();
            $('.default').prev().show();
            $('li.card').removeClass('selected');
            moves++;
            $('.count').remove();
            $('.moves').prepend('<span class="count">' + moves + '</span>');
            setTimeout(function wrongAnim() {
              $('li.card').removeClass("incorrect");
            }, 425);
          }
        }
     }, 500);
  });
  
function reset() {
  moves = 0;
  $('.info div').addClass("reset-animate ");
  $('.count').remove();
  $('.moves').prepend('<span class="count"> - </span>');
  $('li.card').removeClass("correct");
  $('li.card').removeClass('selected');
  $('.deck li.card').find("span").remove();
  shuffle();
  $('.deck li span').addClass("default");
//  $('.deck li span').css("color", "white");
  $back.show();
  $('.rating li').remove();
  $('.rating').append(score);
  clearInterval(timerFunc);
  timeRunning = false;
  timer = [0, 0];
  $('.timer span').remove();
 $('.timer').append('<span>--:--</span>');
  setTimeout(function resetAnim() {
    $('.info div').removeClass("reset-animate ");
  }, 625);
}
  
function win() {
  if ($('li.card.correct').length >= 2) {
      const $win = $('.correct');
  
      if ($win.length === 16) {
        let $rating = $('.rating');
        console.log($rating);
        alert("You win! Your rating is: " + $rating);
        reset();
      }
  }
};
  
  setInterval(function scoreCheck() {
//    console.log($('.rating li'));
    if ($('#fifth') == true) {
      if (moves > 4) {
        $('#fifth').remove();
        let copy = emptyStar.slice(0);
        $('.rating').append(copy);
        copy.splice(0, 1);
      }
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
  
  $('.reset').click( () => {
    reset();
  });
});