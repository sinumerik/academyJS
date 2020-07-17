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

export default menu;
