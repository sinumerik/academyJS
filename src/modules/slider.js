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

export default slider;
