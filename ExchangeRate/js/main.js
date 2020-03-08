const cur1 = document.getElementById("currency-one");
const cur2 = document.getElementById("currency-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate")
const amo1 = document.getElementById("amount-one");
const amo2 = document.getElementById("amount-two");

//Function
function calculate(){
    const CC1 = cur1.value;
    const CC2 = cur2.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${CC1}`)
    .then (res => res.json())
    .then(data => {
        rates = data.rates[CC2];
        rate.innerText = `1 ${CC1} = ${rates} ${CC2}`;
        amo2.value = (amo1.value*rates).toFixed(2);
    });
}

//Event Listener
cur1.addEventListener("change", calculate);
cur2.addEventListener("change", calculate);
amo1.addEventListener("input", calculate);
amo2.addEventListener("input", calculate);
swap.addEventListener("click",() => {
    const temp = cur1.value;
    cur1.value = cur2.value;
    cur2.value = temp;
    calculate();
});