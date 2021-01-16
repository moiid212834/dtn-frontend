import Toastify from 'toastify-js'


const Toast =(message,duration,gravity = 'bottom',position='center',color='green')=>{
  Toastify({
    text: message,
    duration: duration*1000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: gravity, // `top` or `bottom`
    position: position, // `left`, `center` or `right`
    backgroundColor: color,
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function(){} // Callback after click
  }).showToast();
}
export default Toast
