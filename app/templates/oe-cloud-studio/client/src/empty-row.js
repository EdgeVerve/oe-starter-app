import {PolymerElement, html} from '@polymer/polymer';

class EmptyRow extends PolymerElement {
  static get template() {
    return html`
      <style>
      
      :host {
          display:block;
          height:60px;
          width : 100%;
      }
      </style>
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

customElements.define('empty-row', EmptyRow);