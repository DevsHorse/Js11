'use strict';

const bookContainer = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');
const body = document.querySelector('body');

// Восстановить порядок книг 
for (let i = 1; i <= books.length; i++) {
  for (let j = 0; j < books.length; j++){
    if ( books[j].querySelector('h2 a').textContent.indexOf(i) > 0) {
      bookContainer.appendChild(books[j]);
    }
  }
}

//  Сменить фон  
body.style = 'background-image: url("../image/you-dont-know-js.jpg")';

//  Исправить заголовок
for (let i = 0; i < books.length; i++){
  if ( books[i].querySelector('h2 a').textContent.indexOf('3') > 0) {
    books[i].querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';
  }
}
// Убрать рекламу
body.removeChild(adv);

// Сортировка глав книг
const sortChapter = function(indexOfBook) {
    const chapter = books[indexOfBook].querySelectorAll('li');
    const ul = books[indexOfBook].querySelector('ul');
    const newArr = [];
  
    for (let i = 0; i < chapter.length; i++) {
      newArr.push(chapter[i].textContent);
    }
    newArr.sort();
    for (let i = 0; i < chapter.length; i++) {
      chapter[i].textContent = newArr[i];
    }
    for (let i = 0; i < chapter.length; i++) {
      if (chapter[i].textContent.indexOf('Предисловие') >= 0) {
        ul.insertBefore(chapter[i], chapter[1]);
      }
    }
};
sortChapter(0);
sortChapter(5);

// Добавить новую главу 
const newChapter = document.createElement('li');
const currentPlace = books[2].querySelectorAll('li');

newChapter.textContent = 'Глава 8: За пределами ES6';
books[2].querySelector('ul').insertBefore(newChapter, currentPlace[9]);