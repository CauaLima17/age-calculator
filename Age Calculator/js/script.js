// INPUTS
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

//SUBMIT BUTTON
const submitButton = document.querySelector('.calculator__button');

//OUTPUTS
const userDays = document.getElementById('user__days');
const userYears = document.getElementById('user__years');
const userMonths = document.getElementById('user__months');

//INPUTS ERRORS
const errors = [
    'Must be a valid day',
    'Must be a valid month',
    'Must be in the past',
    'This field is required',
];

const calendar = new Date();

let years;
let months;
let days;

const validateInputs = () => {
    let validator = true
    const inputs = document.querySelectorAll('input')
    inputs.forEach((element) => {
        const parent = element.parentElement;
    
        if (!element.value){
            element.style.borderColor = 'hsl(0, 100%, 67%)';
            parent.querySelector('p').textContent = errors[3];
            validator = false;
        }
    
        else if (dayInput.value > 31 || dayInput.value <= 0){
            dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
            dayInput.parentElement.querySelector('p').textContent = errors[0];
            validator = false;
    
        } else if (monthInput.value > 12 || monthInput.value <= 0){
            monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
            monthInput.parentElement.querySelector('p').textContent = errors[1];
            validator = false;
    
        } else if (yearInput.value > calendar.getFullYear()){
            yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
            yearInput.parentElement.querySelector('p').textContent = errors[2];
            validator = false;
            
        } else {
            element.style.borderColor = 'hsl(0, 0%, 86%)';
            parent.querySelector('p').textContent = '';
            validator = true;
        };
    });

    return validator;
};

const showAgeResult = () => {
    userDays.textContent = days;
    userMonths.textContent = months;
    userYears.textContent = years;
};

submitButton.addEventListener('click', () => {
    if (validateInputs()){
        const birthday = new Date(Number(yearInput.value), Number(monthInput.value) - 1, Number(dayInput.value));
        
        const diffInMilliseconds = calendar - birthday;
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
        years = Math.floor(diffInDays / 365);
        const remainingDays = diffInDays % 365;
        months = Math.floor(remainingDays / 30);
        days = remainingDays % 30;
    
        showAgeResult();
    };
});