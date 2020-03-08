const form = document.getElementById('my-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input,message){
    const target = input.parentElement;
    target.className = 'part error';
    const small = target.querySelector('small');
    small.innerText = message ;
};

function showSuccess(input){
    const target = input.parentElement;
    target.className = 'part success';
};

function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim())){
        showSuccess(email);
    } else if (email.value.trim() === ''){
        showError(email,'Email is required');
    } else {
        showError(email,'Email is not valid');
    }
};

function validation(inputArr){
   inputArr.forEach(function(input){
       if(input.value.trim() === ''){
           showError(input,`${getName(input)} is required`);
       } else {
           showSuccess(input);
       }
   });
};

function getName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,`${getName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input,`${getName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
};

function validatePassword(p1,p2){
    if (p1.value!==''){
        if(p1.value === p2.value){
            showSuccess(p2);
        } else {
            showError(p2,'Password do not match');
        }
    } else {
        showError(p2,'Enter your password');
    }
   
}
//Event Listener
form.addEventListener('submit', function(e){
    e.preventDefault();
    validation([username,password,password2])
    checkLength(username,5,20);
    checkLength(password,6,30);
    validateEmail(email);
    validatePassword(password,password2);
});