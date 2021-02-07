const restoreBtn = document.querySelector('.main-control__link');
const blockRestore = document.querySelector('.main-control__restore');

const clearStorage = () => {
  restoreBtn.addEventListener('click', e => {
    e.preventDefault();
    blockRestore.style.display = 'block';
  });

  blockRestore.addEventListener('click', e => {
    if (e.target.classList.contains('main-control__no')) {
      blockRestore.style.display = 'none';
    } else if (e.target.classList.contains('main-control__yes')) {
      localStorage.clear();
      window.location.reload();
    }
  });
};

export { clearStorage };
