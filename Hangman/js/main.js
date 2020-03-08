const word = document.getElementById("word");
const notif = document.getElementById("notification-container");
const playbtn= document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const message = document.getElementById("final-message");
const wrong = document.getElementById("wrong-letter");
const figPart = document.querySelectorAll(".figure-part");

const words = ["programming","application","wizard","java","javascript","react","macbook"];
//const words = ["wizard"];

let selectedWord = words[Math.floor(Math.random()*words.length)];

const correctLetter=[];
const wrongLetter=[];

function displayWord(){
    word.innerHTML = `${selectedWord
        .split('')
        .map(letter => 
        `<span class="letter">
            ${correctLetter.includes(letter) ? letter : ''}
        </span>`)
        .join('')}`;
    
    const innerWord = word.innerText.replace(/\n/g,'');
    if (innerWord === selectedWord){
        message.innerText = "Yeay You Won!";
        popup.style.display="flex";
    }
}

function updateWrong(){
    wrong.innerHTML = `
    ${wrongLetter.length>0 ? '<p>Wrong Letters</p>' : ''}
    ${wrongLetter.map(letter => `<span>${letter}</span>`)}
    `;

    figPart.forEach((part,index) => {
        const error = wrongLetter.length;
        if (index < error){
            part.style.display="block";
        } else {
            part.style.display="none";
        }
    });

    if (wrongLetter.length === figPart.length){
        message.innerText = "Ow Crap! You Have Lost :(";
        popup.style.display="flex";
    }
}

function showNotification(){
    notif.classList.add("show");
    
    setTimeout(() => {notif.classList.remove("show")},2000);
}

window.addEventListener("keydown", e =>{
    if((e.keyCode >= 65) && (e.keyCode <= 90)){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetter.includes(letter)){
                correctLetter.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetter.includes(letter)){
                wrongLetter.push(letter);
                updateWrong();
            } else {
                showNotification();
            }
        }
    }
});

playbtn.addEventListener("click", () =>{
    correctLetter.splice(0);
    wrongLetter.splice(0);

    updateWrong();
    selectedWord = words[Math.floor(Math.random()*words.length)];
    displayWord();
    popup.style.display="none";
});

displayWord();