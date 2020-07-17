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

export default popupAction;
