import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'
import CakeAPI from '../../CakeAPI'

class Cart {
  init(){
    document.title = 'Cart'    
    this.favCake = null  
    this.render()
    Utils.pageIntroAnim()
    this.getFavCake()
  }

  async getFavCake(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favCake = currentUser.favouriteCake
      console.log(this.favCake)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  render(){
    const template = html`
      <va-app-header title="Cart" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      <h1>Favourite Cakes</h1>
          <div class="haircuts-grid">
            ${this.getFavCake == null ? html`
              <sl-spinner></sl-spinner>
            ` : html`
            <va-app-cake></va-app-cake>
            
            `}
          </div>
      </div>        
     
     
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new Cart()