const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if(lockBoard) return;

    if (this === firstCard) return;

  this.classList.add('flip');
  
  if(!hasFlippedCard) {
    // перший клік
        hasFlippedCard = true;
        firstCard = this;

        return;
  } 
    // другий клік
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch()
  }

function checkForMatch (){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
       
    isMatch ? disableCards() : unflipCards();
}
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard()
}

function unflipCards() {
    lockBoard = true;
 setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
   lockBoard = false;
    }, 1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle (){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}) ();

cards.forEach(card => card.addEventListener('click', flipCard));