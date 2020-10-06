import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-input/paper-input';

class LoginPage extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host{
                height:100vh;
                width:100vw;
                background : var(--default-primary-color);
                display:flex;
                align-items:center;
                justify-content:center;
            }

            .login-container{
                padding: 16px;
                border-radius: 4px;
                background: white;
                min-width: 300px;
                box-shadow: var(--shadow-elevation-4dp_-_box-shadow);
            }

        </style>
        <div class="login-container">
            <paper-input label="User Name" value={{cred.username}}></paper-input>
            <paper-input label="Password" value={{cred.password}} type="password"></paper-input>
            <div class="btn-container">
                <paper-button raised on-tap="gotoHome">Login</paper-button>
            </div>
        </div>
        `;
  }
  static get properties() {
    return {
        cred:{
            type:Object,
            value:{}
        }
    };
  }

  gotoHome(){
      console.log(this.cred);
      window.oe_navigate_to('/');
      window.location.reload();
  }
}
window.customElements.define('login-page', LoginPage);
