window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    // получаем поля для таймера
    const timerHours = document.getElementById('timer-hours'),
        timerMinutes = document.getElementById('timer-minutes'),
        timerSeconds = document.getElementById('timer-seconds');

    let timer = function(endDate) {

        const getTimeRemaining = () => {

            const date = Date.now();
            const deadline = new Date(endDate).getTime();

            let remaining = deadline - date,
                d = Math.floor( remaining / 1000 / 60/ 60 / 24 ),
                h = Math.floor( remaining / 1000 / 60/ 60 % 24),
                m = Math.floor( remaining / 1000 /60 % 60),
                s = Math.floor( remaining /1000 % 60 );

            return {h, m, s, remaining};
        };

        const updateClock = () => {
            let timer = getTimeRemaining();

            for(let key in timer) {
                timer[key] = timer[key] + '';

                if (timer[key].length === 1) {
                    timer[key] = '0' + timer[key];
                }
            }

            timerHours.innerText = timer.h;
            timerMinutes.innerText = timer.m;
            timerSeconds.innerText = timer.s;

            let idInterval = setInterval(updateClock, 1000);

            if (timer.remaining <= 0) {
                clearInterval(idInterval);

                timerHours.innerText = '00';
                timerMinutes.innerText = '00';
                timerSeconds.innerText = '00';
            }
        };

        updateClock();
    };

    timer('29 june 2020 12:45');

});