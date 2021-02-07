import { isDelete } from './overwrite-storage';
import { getProgress } from './progress-bar';

const option = document.querySelectorAll('.option');
const save = document.querySelectorAll('.cards__save');
const items = document.querySelectorAll('.cards__item');
const inputSave = document.querySelectorAll('.input-save');
const cards = document.querySelector('.cards');
const setting = document.querySelectorAll('.cards__option-btn');
const edit = document.querySelectorAll('.option__edit');
const deleteCard = document.querySelectorAll('.option__delete');

const cardsOption = () => {
  function showOption(i) {
    option[i].classList.toggle('active');
  }

  function editCard(i) {
    save[i].classList.add('save-active');
    items[i].classList.add('items-active');
    option[i].classList.remove('active');

    items[i].querySelectorAll('.input-save').forEach(item => {
      item.removeAttribute('disabled');
      item.classList.add('input-active');
    });
  }

  function saveGiraffe(i) {
    saveInputs();
    save[i].classList.remove('save-active');
    items[i].classList.remove('items-active');
    inputDisable();
  }

  function saveInputs() {
    const inputsValue = Array.from(document.querySelectorAll('.input-save'));
    const inputsJson = JSON.stringify(inputsValue.map(e => e.value));
    localStorage.setItem('inputsValue', inputsJson);
  }

  function inputDisable() {
    inputSave.forEach(item => {
      item.setAttribute('disabled', 'disabled');
      item.classList.remove('input-active');
    });
  }

  function deleteCards(i) {
    items[i].style.display = 'none';
    items[i].classList.remove('trace');

    getProgress();
    isDelete(i);
  }

  cards.addEventListener('click', event => {
    const etarget = event.target;

    if (etarget.classList.contains('cards__option-btn')) {
      setting.forEach((item, i) => {
        if (etarget === item) {
          showOption(i);
        } else {
          option[i].classList.remove('active');
        }
      });
    } else if (etarget.classList.contains('cards__save')) {
      save.forEach((item, i) => {
        if (etarget === item) {
          saveGiraffe(i);
        }
      });
    } else if (etarget.classList.contains('option__edit')) {
      edit.forEach((item, i) => {
        if (etarget === item) {
          editCard(i);
        }
      });
    } else if (etarget.classList.contains('option__delete')) {
      deleteCard.forEach((item, i) => {
        if (etarget === item) {
          deleteCards(i);
        }
      });
    }
  });
};

const getSaveInputs = () => {
  function getInputs() {
    if (localStorage.getItem('inputsValue') === null) {
      localStorage.setItem('inputsValue', '');
    } else {
      const inputsGet = JSON.parse(localStorage.getItem('inputsValue'));
      for (let i = 0; i < inputsGet.length; i++) {
        inputSave[i].value = inputsGet[i];
      }
    }
  }
  getInputs();
};

export { cardsOption, getSaveInputs };
