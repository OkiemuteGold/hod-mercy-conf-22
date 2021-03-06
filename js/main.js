const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const year = document.getElementById('new_year');

const title = document.getElementById('title');
const countdown = document.getElementById('countdown');
const body = document.body;
const loading = document.getElementById('loading');

/* const audio = document.getElementById('audio');

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    // DOM is loaded and ready for manipulation here
    audio.play();
}); */


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
body.style.backgroundImage = `url(../images/${count}.jpeg`;

setInterval(() => {
    count += 1;
    if (count > 5) {
        count = 0;
    }
    body.style.backgroundImage = `url(../images/${count}.jpeg`;

}, 6500);

// switch title and theme
// function changeTitle() {
//     // run every 4.5 seconds
//     setInterval(() => {
//         title.innerHTML = "Countdown To 2022 Annual Mercy Conference" ? `Theme: <br> Fullness of Joy` : `Countdown To 2022 <br> Annual Mercy Conference`;
//     }, 4500);
// }
// changeTitle();

// run every 9 seconds
let changeTitleInterval = setInterval(() => {
    // title.innerHTML = `Countdown To 2022 <br> Annual Mercy Conference`
}, 9000);


/* PWA ------------------ */
/* register service worker */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then((reg) => {
            console.log('Service Worker Registration Successful. Scope is ' + reg.scope);
        }).catch(error => {
            console.log('Service Worker Registration Failed with ' + error);
        });
};

/* obtain permission to send notification */
const permission = window.Notification.requestPermission();

if (Notification.permission == 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
        // registration.showNotification(showLocalNotification(title, [options]));

        /* show notification content every 5 seconds */
        setInterval(() => {
            showNotificationContents(registration);
        }, 1000 * 60 * 60 * 12);
    });
};

function showNotificationContents(registration) {
    registration.showNotification('Mercy Conference', {
        body: `
                Please remember to attend the Annual Mercy Conference. Comes up Tuesday, February 01, 2022. Time: 6:00pm.
            `,
        icon: '../android-chrome-192x192.png',
        image: '../images/2.jpeg',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        actions: [
            {
                title: 'Register to attend',
                action: 'register',
                icon: '../android-chrome-192x192.png',
                url: 'https://conferences.householdofdavid.org/'
            }
        ],
        timestamp: "6:00pm",
        tag: 'mercy-conference-reminder'
    });
}

/* listen for event on notification */
self.addEventListener('notificationclick', (event) => {
    // console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));

    // if (event.action === 'register') {
    //     const rootUrl = new URL('./', location).href;
    // }
});