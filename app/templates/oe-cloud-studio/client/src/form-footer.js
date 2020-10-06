import {PolymerElement, html} from '@polymer/polymer';

class FormFooter extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors">
         :host {
            display:block;
            width:100%;
            box-sizing: border-box;
            padding-top:16px;
            height:56px;
          }
        </style>

      <div class="footer-section layout horizontal center end-justified">
          <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      title: String
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
  }

}

customElements.define('form-footer', FormFooter);