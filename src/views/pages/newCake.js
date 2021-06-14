import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import CakeAPI from '../../CakeAPI'
import Toast from '../../Toast'


class newCakeView {
  init(){
    document.title = 'New Cake'    
    this.render()    
    Utils.pageIntroAnim()
  }

  newCakeSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      CakeAPI.newCake(formData)
      Toast.show('Cake added!')
      submitBtn.removeAttribute('loading')
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
    }catch{
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
    
  }

  render(){
    const template = html`
      <va-app-header title="New Cake" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>New Cake</h1>
        <sl-form class="page-form" @sl-submit=${this.newCakeSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="cakeName" type="text" placeholder="Cake Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Size</label><br>
            <sl-radio-group label="Select Size" no-fieldset>
              <sl-radio name="cakeSize" value="l">Large</sl-radio>
              <sl-radio name="cakeSize" value="m">Medium</sl-radio>
              <sl-radio name="cakeSize" value="s">Small</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="primary" class="submit-btn" submit>Add Cake</sl-button>
        </sl-form>        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newCakeView()