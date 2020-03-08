const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const price = document.getElementById('price');
const movie = document.getElementById('movie'); 

populateUI();

let ticketPrice = +movie.value;

function populateUI(){
    const seatIndexes = JSON.parse(localStorage.getItem('seatIndexes'));
    if(seatIndexes !== null &&  seatIndexes.length > 0){
        seats.forEach((seat,index) => {
            if (seatIndexes.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const MovieIndex = localStorage.getItem('MovieIndex');
    if (MovieIndex !== null ){
        movie.selectedIndex = MovieIndex;
    }
}


function updateCountSelected(){
    const selected = document.querySelectorAll(".row .seat.selected");
    const seatIndexes = [...selected].map((seat) =>[...seats].indexOf(seat))
   
    localStorage.setItem('seatIndexes',JSON.stringify(seatIndexes));

    const countS = selected.length;

    count.innerHTML = countS;
    price.innerHTML = (countS*ticketPrice) + ".000"
};


function setMovieData(MIndex,MPrice){
    localStorage.setItem('MovieIndex',MIndex);
    localStorage.setItem('MoviePrice',MPrice);
}

movie.addEventListener('change',(e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);

    updateCountSelected();
});


container.addEventListener('click',(e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
       e.target.classList.toggle('selected');
       updateCountSelected();
    } 
});

updateCountSelected();