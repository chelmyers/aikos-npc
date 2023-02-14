let data;

document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready

    console.log('DOM ready');

    fetch('https://spreadsheets.google.com/spreadsheet/pub?key=1PB8o8w9kHG5eJ9SatDOFxfI3W6ELl2wbmX8lnwS6Xk0&output=csv')
    .then(response => console.log(response))
    .then(data => console.log(data))
    .catch(error => console.log(error));

});


function generate () {
    
    let n = 10;
    let prevNums = [];
    let csv;
    
    for (var i = 0; i < n; i++) {

        let select = randomNumber(100);
        let prevUsed = prevNums.includes(select);

        do { 
            select = randomNumber(100);
            prevUsed = prevNums.includes(select);
        } while (prevUsed == true);

        prevNums.push(select);
        
        let html = document.createElement('p');
        html.innerHTML = select;
        document.querySelector(".generate").append(html);
    }
    
    
}


function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function setRandomNumber (){

}