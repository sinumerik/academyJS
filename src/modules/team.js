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

export default team;
