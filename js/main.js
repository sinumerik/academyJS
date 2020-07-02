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

            timerHours.textContent = timer.h;
            timerMinutes.textContent = timer.m;
            timerSeconds.textContent = timer.s;

            const idInterval = setTimeout(updateClock, 1000);

            if (timer.remaining <= 0) {
                clearTimeout(idInterval);

                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        updateClock();
    };

    timer('01 august 2020 00:00');

    // -----------------------------------------------------------------------------------

    // меню
    function menu() {

        const menuBtn = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            serviceBlock = document.querySelector('a[href="#service-block"]');

        const toggleMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', e => {
            let target = e.target;

            if (target.closest('.close-btn')) {
                toggleMenu();
            } else {

                target = target.closest('menu > ul > li > a');

                if (target) {
                    e.preventDefault();
                    const temp = target.getAttribute('href').slice(1);

                    toggleMenu();
                    scroll(temp);
                }
            }
        });

        menuBtn.addEventListener('click', toggleMenu);

        serviceBlock.addEventListener('click', function(e) {
            e.preventDefault();
            const temp = this.getAttribute('href').slice(1);

            scroll(temp);
        });

        function scroll(attr) {
            const temp = document.getElementById(attr);
            temp.scrollIntoView({ behavior: "smooth" });
        }
    }

    menu();

    // -----------------------------------------------------------------------------------

    //popup
    function popupAction() {
        const popupBtn = document.querySelectorAll('.popup-btn'),
            popupWindow = document.querySelector('.popup');

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

        popupWindow.addEventListener('click', e => {
            let target = e.target;

            if (target.classList.contains('popup-close')) {
                popupWindow.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                console.log(target);

                if (!target) {
                    popupWindow.style.display = 'none';
                }
            }
        });
    }

    popupAction();

    // -----------------------------------------------------------------------------------

    // tabs
    function tabsChanger() {
        const serviceHeader = document.querySelector('.service-header'),
            tabs = serviceHeader.querySelectorAll('.service-header-tab'),
            serviceTab = document.querySelectorAll('.service-tab');

        serviceHeader.addEventListener('click', e => {
            const target = e.target;

            tabs.forEach((item, i) => {
                if (item === target.closest('.service-header-tab')) {
                    serviceTab[i].classList.remove('d-none');
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                    serviceTab[i].classList.add('d-none');
                }
            });
        });
    }

    tabsChanger();

    //slider
    const slider = () => {

        let slider = document.querySelector('.portfolio-content'),
            slides = document.querySelectorAll('.portfolio-item'),
            dots = document.querySelectorAll('.dot');

            let currentSlide = 0;
            const timer = 1000;
            const autoPlaySlider = () => {

            if (currentSlide === slides.length) {
                currentSlide = 0;
            } else {
                slides.forEach(item => {
                    item.classList.remove('portfolio-item-active');
                });
                slides[currentSlide].classList.add('portfolio-item-active');
                currentSlide++;
            }
        };

        setInterval(autoPlaySlider, timer);

    };

    slider();

});
