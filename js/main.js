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

        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item');

        const dotCreate = () => {
            const list = document.createElement('ul'),
                item = document.createElement('li');

            list.classList.add('portfolio-dots');
            item.classList.add('dot');
            item.classList.add('dot-active');
            list.prepend(item);

            for (let i = 1; i < slide.length; i++) {
                const dot = document.createElement('li');

                dot.classList.add('dot');
                list.append(dot);
            }

            slider.append(list);

            const dot = document.querySelectorAll('.dot');

            return dot;
        };

        const dot = dotCreate();

        let currentSlide = 0,
            interval;
        const time = 1500;

        const nextSlide = (item, i, nameClass) => {
            item[i].classList.add(nameClass);
        };

        const prevSlide = (item, i, nameClass) => {
            item[i].classList.remove(nameClass);
        };

        const autoPlaySlider = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlider = (time = 1500) => {
            interval = setInterval(autoPlaySlider, time);
        };

        const stopSlider = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (target.matches('.portfolio-btn, .dot')) {

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');

                if (target.matches('.next')) {
                    currentSlide++;
                }

                if (target.matches('.prev')) {
                    currentSlide--;
                }

                if (target.matches('.dot')) {
                    dot.forEach((item, i) => {
                        if (target === item) {
                            currentSlide = i;
                        }
                    });
                }

                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }
                if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            }
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                stopSlider();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                startSlider(time);
            }
        });

        startSlider(time);

    };

    slider();

    //calculator

    const calculator = () => {
        const calcItems = document.querySelectorAll('input.calc-item'),
            regExp = /\D/g;

        calcItems.forEach(item => {
            item.addEventListener('input', event => {
                const target = event.target;

                if (target === item) {
                    item.value = item.value.replace(regExp, '');
                }
            });
        });
    };

    calculator();

    //team
    const team = () => {
        const commandPhotos = document.querySelectorAll('.command__photo');

        commandPhotos.forEach(item => {

            const temp = item.getAttribute('src');

            item.addEventListener('mouseover', event => {
                const target = event.target;

                if (target === item) {
                    item.setAttribute('src', item.dataset.img);
                }
            });

            item.addEventListener('mouseout', event => {
                const target = event.target;

                if (target === item) {
                    item.setAttribute('src', temp);
                }
            });
        });
    };

    team();
});
