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

        const postData = body => fetch(('./server.php'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        form.addEventListener('submit', event => {
            event.preventDefault();

            form.appendChild(messageDiv);

            messageDiv.textContent = pendingMessage;

            const formData = new FormData(form);

            const body = {};

            formData.forEach((item, i) => {
                body[i] = item;
            });

            postData(body)
                .then(response => {

                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }

                    messageDiv.textContent = successMessage;
                    for (const key in body) {
                        form.elements[key].value = '';
                        form.elements[key].style.border = '1px solid transparent';
                    }
                    setTimeout(() => {
                        messageDiv.remove();
                    }, 5000);
                })
                .catch(() => {
                    messageDiv.textContent = errorMessage;
                });
        });
    };

    formListener(modalForm);
    formListener(heroForm);
    formListener(footerForm);
};

export default sendForm;
