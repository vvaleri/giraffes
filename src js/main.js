const cards = document.querySelector('.cards'),
//elements
      option = document.querySelectorAll('.option'),
      main = document.querySelectorAll ('.main__content'),
      items = document.querySelectorAll('.cards__item'),
      new_card = document.querySelector('.new-item'),
      card_new = document.querySelector('.item-new'), 
      input_save = document.querySelectorAll('.input-save'),
      err_giraffe = document.querySelector('.content-main__error'),
      progress = document.querySelector('.progress__fill'),
      percent_progress = document.querySelector('.progress__title > span'),
      menu_item = document.querySelector('.menu__items'),
      block_restore = document.querySelector('.main-control__restore'),
      progress_content = document.querySelector('.progress__content'),
      progress_main = document.querySelector('.progress'),    
//buttons
      menu_buttons = document.querySelectorAll('.menu__list'),
      edit = document.querySelectorAll('.option__edit'),
      save = document.querySelectorAll('.cards__save'),
      delete_card = document.querySelectorAll ('.option__delete'),
      giraffe_btn = document.querySelector('.content-main__btn'),
      setting = document.querySelectorAll('.cards__option-btn'),
      new_save = document.querySelector('#new-save'),
      save_new = document.querySelector('#save-new'),
      restore_btn = document.querySelector('.main-control__link'),
      progress_close = document.querySelector('.progress__close');
     

     //вывод сохраненного в localstorage

    document.addEventListener('DOMContentLoaded', () => {
        getInputs()
        getAllCards()
        newSaveGiraffe()
        saveNewGiraffe()
        fillProgress()
    })


      function saveAllCards() {
        if (localStorage.getItem('cards') === null) {
            let item_arr = Array.from(items)
            let item_att = JSON.stringify(item_arr.map(e => e.getAttribute('data-item')))
            localStorage.setItem('cards', item_att)
        }}
      saveAllCards()


      
      function getAllCards() {
        let all_items =  JSON.stringify(JSON.parse(localStorage.getItem('cards')))
     
        items.forEach((item, i) => {
             let item_delete = item.getAttribute('data-item')
            let index_delete = all_items.indexOf(item_delete)
            
            if (index_delete === -1) {
                items[i].classList.add('delete') 
                items[i].classList.remove('trace')  
            } 
         })
     }
  


//меню

function menuShow() {
  menu_buttons.forEach(item  => {
      item.addEventListener('click', function(e) {
          e.preventDefault();

          let menu_attr = item.getAttribute('data-menu');
          let menu_elem = document.querySelector(`.main__content[data-menu="${menu_attr}"]`)
         
          menuHide()
          item.classList.add('active')
          menu_elem.classList.add('active')
      })
  })
}

menuShow()


function menuHide() {
    menu_buttons.forEach(item => item.classList.remove('active'))
    main.forEach(item => item.classList.remove('active'))
}





//меню каждого жирафа

function showOption(i) {  
    option[i].classList.toggle('active') 
}


//редактировать жирафа

function editCard(i) { 
    save[i].classList.add('save-active')
    items[i].classList.add('items-active')
    option[i].classList.remove('active')
               
    items[i].querySelectorAll('.input-save').forEach(item => {
        item.removeAttribute('disabled');
        item.classList.add('input-active')
    })     
}



//сохранить отредактированнoe

function saveGiraffe(i) {
    saveInputs()
    save[i].classList.remove('save-active')
    items[i].classList.remove('items-active')
    inputDisable()
}


function saveInputs() {
  
    let inputs_val = Array.from(document.querySelectorAll('.input-save'))
    let inputs_json = JSON.stringify(inputs_val.map(e => e.value))
    localStorage.setItem('inputs_val', inputs_json)
}


function inputDisable() {
    input_save.forEach(item => {
        item.setAttribute('disabled', 'disabled')
        item.classList.remove('input-active')
    })
}



//вывести сохраненные инпуты из localstorage

function getInputs() {
    
    if(localStorage.getItem('inputs_val') === null) {
        localStorage.setItem('inputs_val', '')

    } else {

    let inputs_get = JSON.parse(localStorage.getItem('inputs_val'))
        for (let i = 0; i < inputs_get.length; i++) {
            input_save[i].value = inputs_get[i] 
        } 
    } 
}


//удалить карточку

function deleteCards(i) {
    
    items[i].style.display = 'none'   
    items[i].classList.remove('trace')
         
    fillProgress()
    saveDeleteCards(i)
}


// перезапись в localstorage

function saveDeleteCards(i) {
    let item_storage = JSON.parse(localStorage.getItem('cards'))
    let item_giraffe = items[i].getAttribute('data-item')
    let new_storage = item_storage.filter(item => item !== item_giraffe)
            
    localStorage.setItem('cards', JSON.stringify(new_storage))
        
        if (items[i].getAttribute('data-item') === 'New') {
            localStorage.removeItem('class')
        } else if (items[i].getAttribute('data-item') === 'New one') {
            localStorage.removeItem('class-new')
        }
}




// общий обработчик

cards.addEventListener('click', (event) => {
    let target = event.target

    if(target.classList.contains('cards__option-btn') ) {
        setting.forEach((item, i) => {
            if (target == item) {
                showOption(i)
            } else {
                option[i].classList.remove('active') 
            }
        })
    } else if(target.classList.contains('cards__save')) {
        save.forEach((item, i) => {
            if (target == item) {
                saveGiraffe(i)
            }
        })
    } else if(target.classList.contains('option__edit')) {
        edit.forEach((item, i) => {
            if (target == item) {
                editCard(i)
            }
        })
    } else if(target.classList.contains('option__delete')) {
        delete_card.forEach((item, i) => {
            if (target == item) {
                deleteCards(i)
            }
        })
    }
})





//добавить жирафа

    giraffe_btn.addEventListener('click', (event) => {
        let elem = event.currentTarget;
        elem.clicks = (elem.clicks || 0) + 1;


        switch (elem.clicks) {
        case 1:
            new_card.style.display = 'flex' 
            new_save.classList.add('save-active') 
            new_card.classList.add('trace')   
            
            new_card.querySelectorAll('.input-save').forEach(item => {
                item.removeAttribute('disabled');
                item.classList.add('input-active')
            })
            
            saveFirstClick()
            localStorage.setItem('class', 'display')
            hideError() 
            fillProgress()
        break;
            
        case 2:
            saveSecondClick()
            card_new.style.display = 'flex' 
            save_new.classList.add('save-active') 
            save_new.classList.add('trace') 
           
            card_new.querySelectorAll('.input-save').forEach(item => {
                item.removeAttribute('disabled');
                item.classList.add('input-active')
            })
            saveSecondClick()
            localStorage.setItem('class-new', 'display')
            fillProgress()
        break;

        default:
            addThirdGiraffe()
        break;
        }
    })


//сохранить новых жирафов

function newSaveGiraffe() {
        if (localStorage.getItem('class') == 'display') {
            new_card.style.display = 'flex'       
            new_card.classList.remove('items-active')
            new_card.classList.add('trace') 
        } 
    }
   

function saveNewGiraffe() {
    if(localStorage.getItem('class-new') == 'display') {
        card_new.style.display = 'flex' 
        card_new.classList.remove('items-active')
        card_new.classList.add('trace') 
    }
}


function addThirdGiraffe() {
     err_giraffe.style.display = 'block'
    setTimeout(() => {err_giraffe.style.display = 'none'}, 2000)   
}


//клики

function saveFirstClick() {
    if (localStorage.getItem('class') == 'display'){   //
        new_save.classList.remove('save-active')  
        new_card.querySelectorAll('.input-save').forEach(item => {
            item.setAttribute('disabled', 'disabled')
            item.classList.remove('input-active')
        }) 
        addThirdGiraffe()
    }
}

function saveSecondClick() {
    if(localStorage.getItem('class-new') == 'display') {
        save_new.classList.remove('save-active') 
        card_new.querySelectorAll('.input-save').forEach(item => {
            item.setAttribute('disabled', 'disabled')
            item.classList.remove('input-active')
        })
        addThirdGiraffe()
    }
}


function hideError() {
    if(localStorage.getItem('class-new') === null) {
        err_giraffe.style.display = 'none'
    }
}



//progress bar

function fillProgress() {
    let trace = document.querySelectorAll('.trace')
    let num_progress = trace.length / 0.06;

    if ( trace.length > 6) {
    progress.style.width = '100%';
    } else {
    progress.style.width = num_progress + '%';
    }

    let percent = Math.floor(num_progress);
    percent_progress.innerText = percent + '%';
    
}
        
fillProgress()



progress_close.addEventListener('click', () => {
    progress_content.classList.toggle('delete')
    if(progress_content.classList.contains('delete')) {
        progress_main.classList.add('hide')
        progress_close.classList.add('rotate')
    } else {
        progress_main.classList.remove('hide')
        progress_close.classList.remove('rotate')
    }

})



// clear localstorage

restore_btn.addEventListener('click', (e) => {
    e.preventDefault();
    block_restore.style.display = 'block'
})

block_restore.addEventListener('click', (e) => {
    if(e.target.classList.contains('main-control__no')) {
        block_restore.style.display = 'none'
    } else if(e.target.classList.contains('main-control__yes')) {
        localStorage.clear()
        window.location.reload()
    }
})


