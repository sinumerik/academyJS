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

    // -----------------------------------------------------------------------------------

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

    // -----------------------------------------------------------------------------------

    //calculator

    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcItems = document.querySelectorAll('input.calc-item'),
            calcType = document.querySelector('.calc-type'),
            calcCount = document.querySelector('.calc-count'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total'),
            regExp = /\D/g;

        let type;

        // запрещаем ввод инпутов без выбора "типа объекта"
        if (!calcType.options[calcType.options.selectedIndex].value) {
            calcItems.forEach(item => {
                item.value = '';
                item.setAttribute('disabled', 'disabled');
            });
        }

        const numberAnimate = (total = 5) => {
            for (let i = 1; i <= total; i++) {

                // если сумма больше 1000, пропускаем анимацию и выводим сразу значение
                if (total > 1000) {
                    totalValue.textContent = total;
                    break;
                }
                setTimeout(() => {
                    totalValue.textContent = i;
                }, i * 1);
            }
        };

        const changeData = target => {
            // итоговая сумма
            let total = 0,
                mult = 1,
                count = 1;

            // повторная проверка на выбор объекта(его наличие)
            if (!calcType.options[calcType.options.selectedIndex].value) {
                calcItems.forEach(item => {
                    item.setAttribute('disabled', 'disabled');
                    item.value = '';
                });
            } else {
                type = +calcType.options[calcType.options.selectedIndex].value;
                calcItems.forEach(item => {
                    item.removeAttribute('disabled');
                });
            }

            // если есть тип объекта и площадь, начинаем считать итоговую сумму
            if (calcSquare.value && type) {
                // корректировка стоимости с учетом срока
                if (calcDay.value < 5 && calcDay.value) {
                    mult = 2;
                } else if (calcDay.value >= 5 && calcDay.value < 10) {
                    mult = 1.5;
                }

                // корректировка стоимости с учетом количества комнат
                if (calcCount.value > 1) {
                    count += (calcCount.value - 1) / 10;
                }

                total = Math.floor(price * type * calcSquare.value * mult * count);
            }

            if (target.matches('input') || target.matches('select')) {
                numberAnimate(total);
            }
        };

        calcBlock.addEventListener('input', event => {
            const target = event.target;

            if (target.matches('input')) {
                target.value = target.value.replace(regExp, '');
            }

            changeData(target);
        });

    };

    calculator(100);

    // -----------------------------------------------------------------------------------

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

    // -----------------------------------------------------------------------------------

    // send ajax-form

    const sendForm = () => {

        const successMessage = 'Спасибо, мы скоро с Вами свяжемся!',
            errorMessage = 'Что-то пошло не так...',
            pendingMessage = 'Загрузка...';

        const messageDiv = document.createElement('div');

        messageDiv.style.cssText = `padding: 10px;
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            display: inline-block;
            margin-top: 15px;
            margin-bottom: 15px`;

        const heroForm = document.getElementById('form1'),
            modalForm = document.getElementById('form3'),
            footerForm = document.getElementById('form2');

        const postData = (body, successCallback, errorCallback) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    successCallback();
                } else {
                    errorCallback();
                }
            });

            request.open('POST', './server.php');

            request.setRequestHeader('Content-Type', 'application/json');

            request.send(JSON.stringify(body));
        };

        const formListener = form => {

            const regDigit = /^\+?\d+$/,
                regAlphabet = /[а-яА-ЯёЁ\s]+/g;

            for (const key of form.elements) {

                if (key.type === 'submit') {
                    key.setAttribute('disabled', 'disabled');
                }

                if (key.type === 'tel') {
                    key.addEventListener('input', event => {

                        if (regDigit.test(event.target.value)) {
                            event.target.style.border = '1px solid green';
                            for (const key of form.elements) {
                                if (key.type === 'submit') {
                                    key.removeAttribute('disabled');
                                }
                            }
                        } else {
                            event.target.style.border = '1px solid red';
                            for (const key of form.elements) {
                                if (key.type === 'submit') {
                                    key.setAttribute('disabled', 'disabled');
                                }
                            }
                        }
                    });
                }

                if (key.type === 'text') {
                    key.addEventListener('input', event => {

                        if (regAlphabet.test(event.target.value)) {
                            event.target.style.border = '1px solid green';
                        } else {
                            event.target.style.border = '1px solid red';
                            event.target.value = [...event.target.value.matchAll(regAlphabet)].join('');
                        }
                    });
                }
            }

            form.addEventListener('submit', event => {
                event.preventDefault();

                form.appendChild(messageDiv);

                messageDiv.textContent = pendingMessage;

                const formData = new FormData(form);

                const body = {};

                formData.forEach((item, i) => {
                    body[i] = item;
                });

                postData(body, () => {
                    messageDiv.textContent = successMessage;
                    for (const key in body) {
                        form.elements[key].value = '';
                        form.elements[key].style.border = '1px solid transparent';
                    }
                }, () => {
                    messageDiv.textContent = errorMessage;
                });
            });
        };

        formListener(modalForm);
        formListener(heroForm);
        formListener(footerForm);
    };

    sendForm();
});
