const items = document.querySelectorAll('.cards__item');

const isDelete = i => {
  function saveDeleteCards() {
    const itemStorage = JSON.parse(localStorage.getItem('cards'));
    const itemGiraffe = items[i].getAttribute('data-item');
    const newStorage = itemStorage.filter(item => item !== itemGiraffe);

    localStorage.setItem('cards', JSON.stringify(newStorage));

    if (items[i].getAttribute('data-item') === 'New') {
      localStorage.removeItem('class');
    } else if (items[i].getAttribute('data-item') === 'New one') {
      localStorage.removeItem('class-new');
    }
  }
  saveDeleteCards(i);
};

export { isDelete };
