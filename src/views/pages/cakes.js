import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import CakeAPI from '../../CakeAPI'


class CakesView {
  init(){
    document.title = 'Cakes'
    this.Cake = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getCake()
  }

  async getCake(){
    try{
      this.Cake = await CakeAPI.getCake()
      console.log(this.Cake)
      this.render()

    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Cakes" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        
      <div class="cakes-grid">
      ${this.Cake  == null ? html`
      <sl-spinner></sl-spinner>
      ` : html`
        ${this.Cake.map(cake => html`
        <va-app-cake class="cake-card"
          id="${cake._id}"
          cakeName="${cake.cakeName}" 
          description="${cake.description}"
          price="${cake.price}"
          user="${JSON.stringify(cake.user)}"
          image= "${App.apiBase}/images/${cake.image}"
          cakeSize="${cake.cakeSize}"
        >       
        </va-app-cake>
        `)}

      `}
      </div>
      
      </div>      
    `
    render(template, App.rootEl)
  }
}




export default new CakesView()