/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
 //Calc

 const result = document.querySelector('.calculating__result span');

 let sex,height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');



 function calcTotal() {
     if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____'; // Можете придумать что угодно
         return;
     }
     if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
     } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
     }
 }

 calcTotal();

 function getStaticInformation(selector, activeClass) {
     const elements = document.querySelectorAll(selector);

     elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
             if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
             } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'))
             }
 
             elements.forEach(elem => {
                 elem.classList.remove(activeClass);
             });
 
             e.target.classList.add(activeClass);
 
             calcTotal();
         });
     });
 }

 getStaticInformation('#gender div', 'calculating__choose-item_active');
 getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

 function getDynamicInformation(selector) {
     const input = document.querySelector(selector);

     input.addEventListener('input', () => {
        if(input.value.match(/\D/g)){
            input.style.border = '1px solid red';
        }else{
            input.style.border = 'none';
        }



         switch(input.getAttribute('id')) {
             case "height":
                 height = +input.value;
                 break;
             case "weight":
                 weight = +input.value;
                 break;
             case "age":
                 age = +input.value;
                 break;
         }

         calcTotal();
     });
 }

 getDynamicInformation('#height');
 getDynamicInformation('#weight');
 getDynamicInformation('#age');

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
   // Используем Классы

   class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price= price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUah();
    }

    changeToUah(){
        this.price = this.price * this.transfer;
    }
    render(){
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`;
        this.parent.append(element);
    }
}
const getResource = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
       throw new Error(`Could not fetch ${url}, status : ${res.status}`);
    }
    return await res.json();
};
getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
// getResource('http://localhost:3000/menu')
//     .then(data => createCard(data));

// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');

//         element.classList.add("menu__item");

//         element.innerHTML = `
//             <img src=${img} alt=${altimg}>
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//         `;
//         document.querySelector(".menu .container").append(element);
//     });
// } использование без классов

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(){
       // Forms


       const forms = document.querySelectorAll('form');

       const message = {
           loading : 'icons/spinner.svg',
           success : 'Спасибо! Скоро мы с вами свяжемся',
           failure: 'Что-то пошло не так'
       };
   
       forms.forEach(item => {
           bindPostData(item);
       })
   
       const postData = async (url, data) => {
           const res = await fetch(url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: data
           });
           return await res.json();
       };    
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
   
               let statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                   display: block;
                   margin: 0 auto;
               `;
               form.insertAdjacentElement('afterend', statusMessage);
           
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
   
               postData('http://localhost:3000/requests', json)
               .then(data => {
                   console.log(data);
                   showThanksModal(message.success);
                   statusMessage.remove();
               }).catch(() => {
                   showThanksModal(message.failure);
               }).finally(() => {
                   form.reset();
               });
           });
       }
       function showThanksModal (message){
           const prevModalDiolog = document.querySelector('.modal__dialog');
   
           prevModalDiolog.classList.add('hide');
           openModal();
   
           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
           <div class ="modal__content">
               <div class="modal__close" data-close>×</div>
               <div class="modal__title">${message}</div>
           </div>`;
   
           document.querySelector('.modal').append(thanksModal);
           setTimeout(()=>{
               thanksModal.remove();
               prevModalDiolog.classList.add('show');
               prevModalDiolog.classList.remove('hide');
               closeModal();
           },4000)
       }
      
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
     // Modal

     const modalTrigger = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');

function openModal(){
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';
   clearInterval(modalTimerId);
}/* функция для вызова */

modalTrigger.forEach(btn =>{
   btn.addEventListener('click', ()=> openModal());
});/* вызов мод окна */

function closeModal(){
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}/* функция для закрытия */


modal.addEventListener('click', (e)=>{
   if(e.target === modal || e.target.getAttribute('data-close') == ''){
      closeModal();
   }
})/* закрытие окна при клике на подложку*/

document.addEventListener('keydown', (e)=>{
   if(e.code === 'Escape' && modal.classList.contains('show')){
       closeModal();
   }
});/* закрытие окна при нажатии на кнопку Esc */

const modalTimerId = setTimeout(openModal, 50000);/* вызов окна через время */

function showModalByScroll(){
   if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
       openModal();
   }/* пользователь долистал до конца страницы */
   window.removeEventListener('scroll', ()=> showModalByScroll)/* свойство для того чтобы функция вызвалась один раз */
}
window.addEventListener('scroll', ()=> showModalByScroll);

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;`;

        if (i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deletNotDigits(str){
        return +str.replace(/\D/g, '')
    }
    next.addEventListener('click', () => {
        if (offset == deletNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset +=  deletNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });


    function showActiveDot(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function addZeroTo(){
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset =  deletNotDigits(width) * (slides.length - 1);
        } else {
            offset -=  deletNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        addZeroTo();
        showActiveDot();
    });
    
   dots.forEach(dot => {
       dot.addEventListener('click', (e)=>{
           const slideTo = e.target.getAttribute('data-slide-to');

           slideIndex = slideTo;
           offset = offset =  deletNotDigits(width) * (slideTo - 1);
           slidesField.style.transform = `translateX(-${offset}px)`;

        showActiveDot();
        addZeroTo();
       })
   })
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
      // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}/* спрятать весь контент */

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}/* установка по умолчанию */

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});/* навешевание обработчика на родителя (делегирование событий) */

}
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

 // Timer
function timer(){
    const deadline = '2021-08-11';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor( (t/1000) % 60 );
   
        return {
            'total' : t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }/* расчет часов минут секунд до дэдлайна */
   
    function getZero(num) {
        if (num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num;
        }
   
    }/* подставканоля если меньше 10 */
   
    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);  /* обновление через секунду */
              updateClock();
              
        function updateClock(){
            const t = getTimeRemaining(endtime);
   
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
   
            if(t.total <=0){
                clearInterval(timeInterval);
            }
        }
   
    }/* установка времени в DOM */
   
    setClock('.timer', deadline)
}

 module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function() {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    calc();
    cards();
    forms();
    modal();
    slider();
    timer();      
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map