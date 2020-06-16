import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ToolBar extends PolymerElement {
  static get template() {
    return html` 
        <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors">

            :host {
                display:block;
            }

            .container {
                padding: 8px 0px;
                box-sizing: border-box;
                min-height: 48px;  
            };
            label {
                @apply --paper-font-title;
                color : var(--primary-color);
            }

        </style>
        <div class="layout horizontal container justified">
           <slot></slot>
        </div>
        `;
  }

  static get properties() {
    return {
      title: {
        type: String
      }
    };
  }

}

window.customElements.define('tool-bar', ToolBar);