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

export default calculator;
