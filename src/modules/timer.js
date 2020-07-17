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

export default timer;
