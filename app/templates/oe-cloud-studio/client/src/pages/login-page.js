import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { OEAjaxMixin } from 'oe-mixins/oe-ajax-mixin';

/**
 * ### login-page
 * `login-page`
 *
 *
 * @customElement
 * @polymer
 */
class LoginPage extends OEAjaxMixin(PolymerElement) {
  static get is() {
    return 'login-page';
  }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment shared-styles">
    .container{
        width:100vw;
        height:100vh;
        background:var(--accent-color);
    }

    .form-container{
        padding:16px;
        background:#FFFFFF;
        width: 300px;
        height: 200px;
        border-radius: 2px;
        box-shadow: var(--shadow-elevation-4dp_-_box-shadow);
    }

    .login-btn{
        height: 40px;
        margin: 0px;
        border: 1px solid #CCCCCC;
        color: var(--accent-color);
        border-radius: 0px;
    }

    .login-btn[disabled]{
        color: #CCC;
    }

    iron-icon{
        cursor:pointer;
    }
    </style>
    <div class="layout horizontal center-center container">
        <div class="form-container layout vertical around-justified">
            <oe-input field-id label="User Name" value={{userInfo.username}}></oe-input>
            <oe-input field-id label="Password" type=[[_getType(showPassword)]] value={{userInfo.password}}>
                <iron-icon slot="suffix" on-tap="_toggleShowPassword" icon="[[_getPasswordIcon(showPassword)]]"></iron-icon>
            </oe-input>
            <div class="layout horizontal center justified">
                <paper-button class="login-btn" on-tap="__login" disabled=[[_isDisabled(userInfo.*)]]>Log In</paper-button>
            </div>
        </div>
    </div>
    `;
  }

  static get properties(){
      return {
          loginInfo:{
              type:Object,
              value:null,
              notify:true
          }
      }
  }

  connectedCallback() {
    super.connectedCallback();
    this.userInfo = {
        username:'',
        password:''
    }
    this.set('showPassword',false);
  }

  _getType(showPassword){
      return showPassword ? "text" : "password";
  }

  _getPasswordIcon(showPassword){
      return showPassword ? "visibility-off" : "visibility";
  }

  _toggleShowPassword(){
      this.set('showPassword',!this.showPassword);
  }

  _isDisabled(){
      return !(this.userInfo.username.trim() && this.userInfo.password.trim());
  }

  __login(){
      this.makeAjaxCall('/api/Users/login/','post',this.userInfo,null,null,null,(err,resp)=>{
        if(err){
            this.fire('oe-show-error',err);
            return;
        }
        this.set('loginInfo',resp);
        this.fire('login-success',resp);
      });
  }
}
window.customElements.define(LoginPage.is, LoginPage);