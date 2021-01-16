import axios from 'axios'
import Toast from '@components/toast'


class Subscription {
  constructor() {
    this.extraInfoOpen = false
    this.inputs = [...document.querySelectorAll('.c-modal input')]
    this.backBtn = document.getElementById('s_buttons_back')
    this.extInfo = document.getElementById('ext_info')
    this.emailField = document.getElementById('s_email')
    this.submitBtn = document.getElementById('s_submit')
    this.errorBackBtn = document.getElementById('s_error_back')
    this.bindEvents()
  }
  showExtInfo() {
    this.extInfo.classList.remove('h-0')
    this.backBtn.classList.remove('h-0')
    this.extraInfoOpen = true
  }
  hideExtInfo() {
    this.extInfo.classList.add('h-0')
    this.backBtn.classList.add('h-0')
    this.extraInfoOpen = false
  }

  bindEvents() {
    this.emailField.addEventListener('focusin', () => {
      this.showExtInfo()
    })
    this.backBtn.addEventListener('click', () => {
      this.hideExtInfo()
      var helpMessages=[...document.querySelectorAll('.form__item-error')]
      helpMessages.forEach(element => {
        element.style.display="none"
      });
      this.inputs.forEach(el =>{
        el.style.boxShadow="0 0 0 1px #000000 inset"
      })
    })
    this.submitBtn.addEventListener('click',() => {
      this.showExtInfo()
      var error = this.validateForm();
      if(!error) this.submitForm();
    })
    this.errorBackBtn.addEventListener('click',() => {
      document.getElementById('error_sub').style.display='none'
      document.getElementById('form_sub').style.display='block'

    })
  }

  validateForm(){
    var error = false;
    var helpMessages=[...document.querySelectorAll('.form__item-error')]
    this.inputs.forEach((el,index) => {
      if(!el.checkValidity()){
        helpMessages[index].innerHTML=el.validationMessage
        helpMessages[index].style.display='block'
        el.style.boxShadow="0 0 0 2px red inset"
        error = true;
      }else{
        helpMessages[index].style.display='none'
        el.style.boxShadow="0 0 0 2px green inset"
      }
    })
    return error;
  }

  submitForm(){
    var inputValues=[];
    this.inputs.forEach(element => {
      inputValues.push(element.value);
    });
    const bodyFormData = new FormData();

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/test',
      data: {
        values: JSON.stringify(inputValues),
        generateError: 0
      },
      })
      .then(function (response) {
          //handle success
          document.getElementsByClassName('modal__button-close')[0].click()
          Toast('You have subscribed succesfully to our <b>Newsletter</b>!',5)
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          document.getElementById('error_sub').style.display='block'
          document.getElementById('form_sub').style.display='none'
          console.log(response);
      });
  }

}
export default new Subscription()
