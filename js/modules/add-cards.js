import { getProgress } from './progress-bar';

const giraffeBtn = document.querySelector('.content-main__btn');
const newCard = document.querySelector('.new-item');
const newSave = document.querySelector('#new-save');
const cardNew = document.querySelector('.item-new');
const saveNew = document.querySelector('#save-new');
const errorGiraffe = document.querySelector('.content-main__error');

const addCards = () => {
  giraffeBtn.addEventListener('click', event => {
    const elem = event.currentTarget;
    elem.clicks = (elem.clicks || 0) + 1;

    switch (elem.clicks) {
      case 1:
        newCard.style.display = 'flex';
        newSave.classList.add('save-active');
        newCard.classList.add('trace');

        newCard.querySelectorAll('.input-save').forEach(item => {
          item.removeAttribute('disabled');
          item.classList.add('input-active');
        });

        saveFirstClick();
        localStorage.setItem('class', 'display');
        hideError();
        getProgress();
        break;

      case 2:
        saveSecondClick();
        cardNew.style.display = 'flex';
        saveNew.classList.add('save-active');
        saveNew.classList.add('trace');

        cardNew.querySelectorAll('.input-save').forEach(item => {
          item.removeAttribute('disabled');
          item.classList.add('input-active');
        });
        saveSecondClick();
        localStorage.setItem('class-new', 'display');
        getProgress();
        break;

      default:
        addThirdGiraffe();
        break;
    }
  });

  function addThirdGiraffe() {
    errorGiraffe.style.display = 'block';
    setTimeout(() => {errorGiraffe.style.display = 'none'}, 2000);
  }

  function saveFirstClick() {
    if (localStorage.getItem('class') == 'display') {
      newSave.classList.remove('save-active');
      newCard.querySelectorAll('.input-save').forEach(item => {
        item.setAttribute('disabled', 'disabled');
        item.classList.remove('input-active');
      });
      addThirdGiraffe();
    }
  }

  function saveSecondClick() {
    if (localStorage.getItem('class-new') == 'display') {
      saveNew.classList.remove('save-active');
      cardNew.querySelectorAll('.input-save').forEach(item => {
        item.setAttribute('disabled', 'disabled');
        item.classList.remove('input-active');
      });
      addThirdGiraffe();
    }
  }

  function hideError() {
    if (localStorage.getItem('class-new') === null) {
      errorGiraffe.style.display = 'none';
    }
  }
};

const saveNewCards = () => {
  function newSaveGiraffe() {
    if (localStorage.getItem('class') == 'display') {
      newCard.style.display = 'flex';
      newCard.classList.remove('items-active');
      newCard.classList.add('trace');
    }
  }
  newSaveGiraffe();

  function saveNewGiraffe() {
    if (localStorage.getItem('class-new') == 'display') {
      cardNew.style.display = 'flex';
      cardNew.classList.remove('items-active');
      cardNew.classList.add('trace');
    }
  }
  saveNewGiraffe();
};

export { addCards, saveNewCards };
