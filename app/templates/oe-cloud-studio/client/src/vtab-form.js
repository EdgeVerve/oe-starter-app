import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

class VTabForm extends PolymerElement {
  static get template() {
    return html` 
    <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors">

        :host {
          display:block;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12),
          0 3px 1px -2px rgba(0, 0, 0, 0.2);
          min-height:200px;
          overflow: hidden;
          height:calc(100% - 16px);
          background: #fff;
          @apply --layout-vertical;
          padding-bottom:16px;
        }

          .header {
            height:64px;
            background: #fff;
          }
          .content{
            background: #fff;    
            height:calc(100% - 64px); 
          }
          
          .wrapper {
            background: #fff;
            height:100%;
          }
    </style>
        
    <template is="dom-if" if=[[!hideHeader]]>
      <div class="header">
        <slot name="header"></slot>
      </div>
    </template>
    <div class="flex wrapper layout horizontal">
      <slot name="tabs"></slot>
      <div class="content layout flex">
        <slot></slot>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      hideHeader: {
        type: Boolean,
        value: false
      }
    }
  }

}

window.customElements.define('vtab-form', VTabForm);