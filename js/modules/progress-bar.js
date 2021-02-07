const progress = document.querySelector('.progress__fill');
const percentProgress = document.querySelector('.progress__title > span');
const progressClose = document.querySelector('.progress__close');
const progressContent = document.querySelector('.progress__content');
const progressMain = document.querySelector('.progress');

const getProgress = () => {
  function fillProgress() {
    const trace = document.querySelectorAll('.trace');
    const numProgress = trace.length / 0.06;

    if (trace.length > 6) {
      progress.style.width = '100%';
    } else {
      progress.style.width = `${numProgress}%`;
    }

    const percent = Math.floor(numProgress);
    percentProgress.innerText = `${percent}%`;
  }

  fillProgress();
};

const closeProgressBar = () => {
  progressClose.addEventListener('click', () => {
    progressContent.classList.toggle('delete');
    if (progressContent.classList.contains('delete')) {
      progressMain.classList.add('hide');
      progressClose.classList.add('rotate');
    } else {
      progressMain.classList.remove('hide');
      progressClose.classList.remove('rotate');
    }
  });
};

export { getProgress, closeProgressBar };
