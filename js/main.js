import { openMenu } from './modules/menu';
import { cardsOption, getSaveInputs } from './modules/cards-option';
import { saveCards, getCards } from './modules/get-cards';
import { getProgress, closeProgressBar } from './modules/progress-bar';
import { clearStorage } from './modules/clear-storage';
import { addCards, saveNewCards } from './modules/add-cards';

document.addEventListener('DOMContentLoaded', () => {
  getSaveInputs();
  getCards();
  saveNewCards();
  getProgress();
});

saveCards();
getCards();
openMenu();
addCards();
cardsOption();
getProgress();
closeProgressBar();
clearStorage();
