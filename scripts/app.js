$(document).ready( () => {
  const $cards = $(".deck li");
  const $back = $('.deck li i');
  let $timeCount = $('.time-count').text();
  let moves = 0;
  let timer = [0, 0]
  let timeRunning = false;
  let timerFunc;
  let currentTime;
  const shuffleDeck = [
    '<span><img src="../imgs/phoenix.svg" alt="Fiery phoenix creature">Phoenix</span>',
    '<span><img src="../imgs/phoenix.svg" alt="Fiery phoenix creature">Phoenix</span>',
    '<span><img src="../imgs/dragon.svg" alt="Green dragon">Dragon</span>',
    '<span><img src="../imgs/dragon.svg" alt="Green dragon">Dragon</span>',
    '<span><img src="../imgs/pegasus.svg" alt="Rearing pegasus">Pegasus</span>',
    '<span><img src="../imgs/pegasus.svg" alt="Rearing pegasus">Pegasus</span>',
    '<span><img src="../imgs/golem.svg" alt="Golem rock creature">Golem</span>',
    '<span><img src="../imgs/golem.svg" alt="Golem rock creature">Golem</span>',
    '<span><img src="../imgs/siren.svg" alt="Siren singing">Siren</span>',
    '<span><img src="../imgs/siren.svg" alt="Siren singing">Siren</span>',
    '<span><img src="../imgs/hydra.svg" alt="Hydra ready to attack">Hydra</span>',
    '<span><img src="../imgs/hydra.svg" alt="Hydra ready to attack">Hydra</span>',
    '<span><img src="../imgs/elf.svg" alt="Elf head, long pointy ears">Elf</span>',
    '<span><img src="../imgs/elf.svg" alt="Elf head, long pointy ears">Elf</span>',
    '<span><img src="../imgs/dwarf.svg" alt="Dwarf with helmet and thick beard">Dwarf</span>',
    '<span><img src="../imgs/dwarf.svg" alt="Dwarf with helmet and thick beard">Dwarf</span>'
  ];
  
  const score = [
    '<li><img src="../imgs/primary-star.svg"></li>',
    '<li id="second"><img src="../imgs/primary-star.svg" alt="golden star"></li>',
    '<li id="third"><img src="../imgs/primary-star.svg" alt="golden star"></li>',
    '<li id="fourth"><img src="../imgs/primary-star.svg" alt="golden star"></li>',
    '<li id="fifth"><img src="../imgs/primary-star.svg" alt="golden star"></li>'
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
      time = `0${time}`;
    }
    return time;
  }
  
  const $front = $(".deck li span");
  $front.addClass("default");
  
  
  //on card click
  $($cards).click( (evt) => {
    if (!timeRunning) {
      timeRunning = true;
      timerFunc = setInterval(function runTimer() {
        timer[1]++;

        if (timer[1] > 59) {
          timer[1] = 0;
          timer[0]++;
        }
        
        currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]);
        $('.timer span').remove();
        $('.timer').append('<span>' + currentTime + '<span>');
      }, 1000);
    }
    
    let cur = evt.currentTarget;
    $(cur).find("i").toggle();
    $(cur).find("span").toggle();
    $(cur).addClass("selected");
    
    const $selection = $(".selected");
    
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
            $(correct1).addClass("correct");
            $(correct2).addClass("correct");
            $("li.card.correct span").removeClass("default");
            $("li.card").removeClass("selected");
            moves++;
            $(".count").remove();
            $(".moves").prepend('<span class="count">' + moves + '</span>');
            win();
          } else {
            $(".selected").addClass("incorrect");
            $($cards).removeClass("selected");
            $(".default").hide();
            $(".default").prev().show();
            $("li.card").removeClass("selected");
            moves++;
            $(".count").remove();
            $(".moves").prepend('<span class="count">' + moves + '</span>');
            setTimeout(function wrongAnim() {
              $("li.card").removeClass("incorrect");
            }, 425);
          }
        }
     }, 500);
  });
  
  //reset game
  function reset() {
    moves = 0;
    $(".info div").addClass("reset-animate ");
    $(".count").remove();
    $(".moves").prepend('<span class="count"> - </span>');
    $("li.card").removeClass("correct");
    $("li.card").removeClass("selected");
    $(".deck li.card").find("span").remove();
    shuffle();
    $(".deck li span").addClass("default");
    $back.show();
    $(".rating li").remove();
    $(".rating").append(score);
    clearInterval(timerFunc);
//    timerFunc = null;
    timer = [0, 0];
    timeRunning = false;
    $(".timer span").remove();
    $(".timer").append("<span>--:--</span>");
    setTimeout(function resetAnim() {
      $(".info div").removeClass("reset-animate ");
    }, 625);
  }

  //Check to see if win condition is met
  function win() {
    if ($("li.card.correct").length >= 2) {
        const $win = $(".correct");

        if ($win.length === 4) {
          let score = 0;
          let $rating = $(".rating li");
          clearInterval(timerFunc);
          $(".modal-content p").remove();
          $(".modal-content h2").after(`<p>You made ${moves} moves and scored a rating of: </p>`);
          while (score <= $rating.length) {
            $(".modal-content p").append($rating[score]);
            score++;
          }
          $(".modal-content p").after(`<p>You took ${currentTime} to complete this game.</p>`);
          
          if ($rating.length === 5) {
            $(".modal-content img#reg-win").remove();
            $(".modal-content h2").before('<img src="../imgs/angel.png" alt="Angel with halo and arms wide open" id="mythic-win">');
            $(".modal-content h2").remove();
            $(".modal-content img#mythic-win").after("<h2>Mythic Victory! You are godlike!</h2>");
          }
          $(".modal").toggle();
      }
    }
  }
  
  $(".play-again").click( () => {
    reset();
    $(".modal").toggle();
  });
  
  $(".close").click( () => {
    $(".modal").toggle();
  });
  
  //Check current move count to determine score
  setInterval(function scoreCheck() {
//    console.log($('.rating li'));
//    if ($("#fifth") == true) {
      if (moves > 12) {
        $("#fifth").remove();
//        let copy = emptyStar.slice(0);
//        $(".rating").append(copy);
//        copy.splice(0, 1);
      }
//    }
    
    if (moves > 18) {
      $("#fourth").remove();
    }
    
    if (moves > 24) {
      $("#third").remove();
    }
    
    if (moves > 30) {
      $("#second").remove();
    }
  }, 100);
  
  $(".reset").click( () => {
    reset();
  });
});