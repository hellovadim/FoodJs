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