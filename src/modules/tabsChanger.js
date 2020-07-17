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

export default tabsChanger;
