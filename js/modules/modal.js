function openModal(modalSelector, modalTimerId){
   const modal = document.querySelector(modalSelector);
         modal.classList.add('show');
         modal.classList.remove('hide');
         document.body.style.overflow = 'hidden';

         if(modalTimerId){
            clearInterval(modalTimerId);
         }
}/* функция для вызова */

function closeModal(modalSelector){
   const modal = document.querySelector(modalSelector);
         modal.classList.add('hide');
         modal.classList.remove('show');
         document.body.style.overflow = '';
}/* функция для закрытия */


function modal(triggerSelector, modalSelector, modalTimerId){
     // Modal
   const modalTrigger = document.querySelectorAll(triggerSelector),
         modal = document.querySelector(modalSelector);



modalTrigger.forEach(btn =>{
   btn.addEventListener('click', ()=> openModal(modalSelector, modalTimerId));
});/* вызов мод окна */

modal.addEventListener('click', (e)=>{
   if(e.target === modal || e.target.getAttribute('data-close') == ''){
      closeModal(modalSelector);
   }
})/* закрытие окна при клике на подложку*/

document.addEventListener('keydown', (e)=>{
   if(e.code === 'Escape' && modal.classList.contains('show')){
       closeModal(modalSelector);
   }
});/* закрытие окна при нажатии на кнопку Esc */



function showModalByScroll(){
   if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
       openModal(modalSelector, modalTimerId);
   }/* пользователь долистал до конца страницы */
   window.removeEventListener('scroll', ()=> showModalByScroll())/* свойство для того чтобы функция вызвалась один раз */
}
window.addEventListener('scroll', ()=> showModalByScroll());

}

export default modal;
export {closeModal};
export {openModal};