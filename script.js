console.log('hello Console User!')
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total=document.getElementById('total');
const movieSelect = document.getElementById('movie');
// const tickectPrice= parseInt(movieSelect.value);
populateUI();
let tickectPrice= +movieSelect.value; //+ = parseInt

// console.log(tickectPrice);

//save movie data
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats);

    //copy selected seatd into array => map through array => return a new aaray index
    //... = spread operator => pass the values and not the array itself
    //.map returns array

    const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat) );
    // console.log(seatsIndex);
    //local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount);
    count.innerText= selectedSeatsCount;
    total.innerText = selectedSeatsCount*tickectPrice;
}

//listener for clicking
container.addEventListener('click', (e)=>{
    // console.log(e.target);
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

//listener for movie change
movieSelect.addEventListener('change', e=>{
    tickectPrice=+e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    // console.log(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//get data from local storage and put it in UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);
    if(selectedSeats!== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!==null)
    {
        movieSelect.selectedIndex=selectedMovieIndex;
    }
}
updateSelectedCount();