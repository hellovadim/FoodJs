window.addEventListener('DOMContentLoaded', function() {

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
    


  // Timer
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


    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

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
    modalCloseBtn.addEventListener('click', ()=> closeModal());/* закрытие мод окна */

    modal.addEventListener('click', (e)=>{
        if(e.target === modal){
           closeModal();
        }
    })/* закрытие окна при клике на подложку*/

    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });/* закрытие окна при нажатии на кнопку Esc */

    const modalTimerId = setTimeout(openModal, 5000);/* вызов окна через какойто время */

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
        }/* пользователь долистал до конца страницы */
        window.removeEventListener('scroll', ()=> showModalByScroll)/* свойство для того чтобы функция вызвалась один раз */
    }
    window.addEventListener('scroll', ()=> showModalByScroll);

});