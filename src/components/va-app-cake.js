import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-app-cake', class Cake extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id:{
        type:String
      },
     cakeName: {
        type: String
      },
    description: {
          type: String
      },
    price: {
        type: String
    },
    image: {
        type: String
    },
    user: {
        type: Object
    },
    cakeSize: {
        type: String
    }
   }
}

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    const dialogEl = document.createElement('sl-dialog')
    dialogEl.className = 'cake-dialog'
    const dialogContent = html `
          <style>
                .wrap {
                  display: flex;
                }
                .image {
                  width: 50%;
                }
                .image img {
                  width: 100%;
                }
                .content {
                  padding-left: 1em;
                }
                .gender span,
                
           </style>
            <div class="wrap">
              <div class="image">
                <img src="${this.image}" alt="${this.name}" />
              </div>
              <div class="content">
                <h1>${this.cakeName}</h1>
                <p class="price">$${this.price}</p>
                <p class="gender">Description : <span>${this.description}</span></p>
                <p class="length">Cake Size: <span>${this.cakeSize}</span></p>

                <sl-button @click=${this.addFavCake.bind(this)}>
                  <sl-icon slot="prefix" name="basket2"></sl-icon>
                  Add to Cart
                </sl-button>
              </div>
            </div>
    `
    render(dialogContent, dialogEl)

    document.body.append(dialogEl)

    dialogEl.show()

    dialogEl.addEventListener('sl-after-hide', () => {
      dialogEl.remove()
    })
  }

  async addFavCake(){    
    try {
      UserAPI.addFavCake(this.id)
      Toast.show('Cake added cart')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  
  render(){    
    return html`
    <style>
      .author {
        font-size: 0.9em;
        font-style: italic;
        opacity: 0.8;
      }
    </style>

    <sl-card>
      <img slot="image" src="${this.image}" />
      <h2>${this.cakeName}</h2>
      <h3>$${this.price}</h3>
      <p class="author"> By ${this.user.firstName} ${this.user.lastName}</p>
      <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
      <sl-icon-button name="basket2" label="Add to Cart" @click=${this.addFavCake.bind(this)}></sl-icon>

    </sl-card>
    `
  }
  
})
