const items = document.querySelectorAll('.cards__item');

const saveCards = () => {
  function saveAllCards() {
    if (localStorage.getItem('cards') === null) {
      const itemArr = Array.from(items);
      const itemAttribute = JSON.stringify(itemArr.map(e => e.getAttribute('data-item')));
      localStorage.setItem('cards', itemAttribute);
    }
  }

  saveAllCards();
};

const getCards = () => {
  function getAllCards() {
    const allItems = JSON.stringify(JSON.parse(localStorage.getItem('cards')));

    items.forEach((item, i) => {
      const itemDelete = item.getAttribute('data-item');
      const indexDelete = allItems.indexOf(itemDelete);

      if (indexDelete === -1) {
        items[i].classList.add('delete');
        items[i].classList.remove('trace');
      }
    });
  }
  getAllCards();
};

export { saveCards, getCards };
