const menuButtons = document.querySelectorAll('.menu__list');
const main = document.querySelectorAll('.main__content');

const openMenu = () => {
  function menuShow() {
    menuButtons.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();

        const menuAttribute = item.getAttribute('data-menu');
        const menuElem = document.querySelector(`.main__content[data-menu="${menuAttribute}"]`);

        menuHide();

        item.classList.add('active');
        menuElem.classList.add('active');
      });
    });
  }

  menuShow();

  function menuHide() {
    menuButtons.forEach(item => item.classList.remove('active'));
    main.forEach(item => item.classList.remove('active'));
  }
};

export { openMenu };
