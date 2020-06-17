'use sctrict';

const books = document.querySelector('.books'),
    collectionBooks = document.querySelectorAll('.book'),
    // collectionsBooks[1] - первая книга
    // collectionsBooks[0] - вторая книга
    // collectionsBooks[4] - третья книга
    // collectionsBooks[3] - четвертая книга
    // collectionsBooks[5] - пятая книга
    // collectionsBooks[2] - шестая книга
    adv = document.querySelector('.adv');

// ставим книги в правильном порядке
collectionBooks[0].before(collectionBooks[1]);
collectionBooks[0].after(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);
// collectionBooks[1].replaceWith(collectionBooks[0]);
// books.prepend(collectionBooks[1]); 
// collectionBooks[2].replaceWith(collectionBooks[4]);
// books.append(collectionBooks[2]);

// ---------------------------------------------------------------------------------

// меняем фон страницы
document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

// ---------------------------------------------------------------------------------

// убираем рекламу
adv.remove();

// ---------------------------------------------------------------------------------

// работаем с заголовком третьей книги
collectionBooks[4].firstElementChild.firstElementChild.innerText = 'Книга 3. this и Прототипы Объектов';

// ---------------------------------------------------------------------------------

// работаем с главами второй книги
let chaptersBook2 = collectionBooks[0].lastElementChild.children; // получаем коллекцию элементов списка

// ставим список в правильном порядке
chaptersBook2[9].after(chaptersBook2[2]);
chaptersBook2[2].after(chaptersBook2[5]);
chaptersBook2[3].after(chaptersBook2[7]);

// ---------------------------------------------------------------------------------

// работаем с пятой книгой
let chaptersBook5 = collectionBooks[5].lastElementChild.children; // получаем коллекцию элементов списка

// ставим правильный порядок
chaptersBook5[1].after(chaptersBook5[9]);
chaptersBook5[5].after(chaptersBook5[3]);
chaptersBook5[8].after(chaptersBook5[6]);

// ---------------------------------------------------------------------------------

// работаем с шестой книгой
let chaptersBook6 = collectionBooks[2].lastElementChild.children;

//клонируем список главы(можно любой, главное глубокое клонирование)
let chapter8 = chaptersBook6[8].cloneNode(true);

// меняем текст на нужный
chapter8.textContent = 'Глава 8: За пределами ES6';

// вставляем главу в нужное место
chaptersBook6[8].after(chapter8);
