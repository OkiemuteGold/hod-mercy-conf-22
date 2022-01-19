const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const year = document.getElementById('new_year');

const title = document.getElementById('title');
const countdown = document.getElementById('countdown');
const body = document.body;
const loading = document.getElementById('loading');

// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const d = new Date();
// let day = days[d.getDay()];
// let month = months[d.getMonth() + 1];

const currentYear = new Date().getFullYear();
const conferenceDay = new Date(`February 01 ${currentYear} 00:00:00`);

// set background year
year.innerText = conferenceDay.toDateString();

// update countdown time
function updateCountdown() {
    const currentTime = new Date();
    const timeDiff = conferenceDay - currentTime;

    const day = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
    const hr = Math.floor(timeDiff / 1000 / 60 / 60) % 24;
    const min = Math.floor(timeDiff / 1000 / 60) % 60;
    const sec = Math.floor(timeDiff / 1000) % 60;

    // add value to DOM
    days.innerText = day;
    hours.innerText = doubled(hr);
    minutes.innerText = doubled(min);
    seconds.innerText = doubled(sec);

    // update display when event day reaches
    if (
        days.innerText == 0 &&
        hours.innerText == 0 &&
        minutes.innerText == 0 &&
        seconds.innerText == 0
    ) {
        reset();
    }

    function reset() {
        clearInterval(countdownInterval);
        countdown.innerText = "";
        title.innerText = "Welcome To Annual Mercy Conference Day1";
        title.style.margin = "0";
        year.innerText = "";
        clearInterval(changeTitleInterval);
    }

    // add 0 if number is less than 10
    function doubled(i) {
        if (i < 10) {
            return `0${i}`;
        } else {
            return i;
        }
    }
}

// show spinner before countdown timer
setTimeout(() => {
    loading.remove()
    countdown.style.display = 'flex';
}, 1000);

// run every second
let countdownInterval = setInterval(() => {
    updateCountdown();
}, 1000);

let count = 0;
body.style.backgroundImage = `url(../img/${count}.jpeg`;

setInterval(() => {
    count += 1;
    if (count > 4) {
        count = 0;
    }
    body.style.backgroundImage = `url(../img/${count}.jpeg`;

}, 6500);

// switch title and theme
function changeTitle() {
    // run every 4.5 seconds
    setInterval(() => {
        title.innerHTML = "Countdown To 2022 Annual Mercy Conference" ? `Theme: <br> Fullness of Joy` : `Countdown To 2022 <br> Annual Mercy Conference`;
    }, 4500);
}
changeTitle();

// run every 9 seconds
let changeTitleInterval = setInterval(() => {
    title.innerHTML = `Countdown To 2022 <br> Annual Mercy Conference`
}, 9000);