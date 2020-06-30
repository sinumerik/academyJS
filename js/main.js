window.addEventListener('DOMContentLoaded', () => {

    // таймер
    const timer = function(endDate) {
        // получаем поля для таймера
        const timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        const getTimeRemaining = () => {

            const date = Date.now();
            const deadline = new Date(endDate).getTime();

            const remaining = deadline - date,
                // d = Math.floor(remaining / 1000 / 60 / 60 / 24),
                h = Math.floor(remaining / 1000 / 60 / 60 % 24),
                m = Math.floor(remaining / 1000 / 60 % 60),
                s = Math.floor(remaining / 1000 % 60);

            return { h, m, s, remaining };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            for (const key in timer) {
                timer[key] += '';

                if (timer[key].length === 1) {
                    timer[key] = '0' + timer[key];
                }
            }

            timerHours.innerText = timer.h;
            timerMinutes.innerText = timer.m;
            timerSeconds.innerText = timer.s;

            const idInterval = setInterval(updateClock, 1000);

            if (timer.remaining <= 0) {
                clearInterval(idInterval);

                timerHours.innerText = '00';
                timerMinutes.innerText = '00';
                timerSeconds.innerText = '00';
            }
        };

        updateClock();
    };

    timer('29 july 2020 12:45');

    // -----------------------------------------------------------------------------------

    // меню
    function menu() {

        const menuBtn = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li'),
            link = menu.querySelectorAll('ul > li > a'),
            serviceBlock = document.querySelector('a[href="#service-block"]');

        link.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const temp = item.getAttribute('href').slice(1);

                scroll(temp);
            });
        });

        serviceBlock.addEventListener('click', function(e) {
            e.preventDefault();
            const temp = this.getAttribute('href').slice(1);

            scroll(temp);
        });

        function scroll(attr) {
            const temp = document.getElementById(attr);
            temp.scrollIntoView({ behavior: "smooth" });
        }

        function toggleMenu() {
            menu.classList.toggle('active-menu');
        }

        menuBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        menuItems.forEach(item => {
            item.addEventListener('click', toggleMenu);
        });

    }

    menu();

    // -----------------------------------------------------------------------------------

    //popup
    function popupAction() {
        const popupBtn = document.querySelectorAll('.popup-btn'),
            popupWindow = document.querySelector('.popup'),
            popupCloseBtn = document.querySelector('.popup-close');

        popupBtn.forEach(item => {
            item.addEventListener('click', () => {
                popupWindow.style.display = 'block';

                if (window.innerWidth > 768) {
                    popupWindow.animate([{
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }]
                    , 300);
                }
            });
        });

        popupCloseBtn.addEventListener('click', () => {
            popupWindow.style.display = 'none';
        });
    }

    popupAction();




});
