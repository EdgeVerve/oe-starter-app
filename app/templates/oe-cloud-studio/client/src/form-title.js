import { PolymerElement, html } from '@polymer/polymer';

class FormTitle extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors">

      :host {
        display: flex;
        justify-content:flex-start;
        width: 100%;
        padding-top: 8px;
        height : 61px;
        padding-bottom: 8px;
        box-sizing: border-box;
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
      }

      .topbar {
        display:flex;
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
    };

      label {
        @apply --paper-font-title;
        /* color : var(--primary-color); */
        /* margin-left: 2%; */
        min-width:60px;
        font-size: 20px;
      }

      .key {
        position: relative;
        @apply --paper-font-title;
        font-size: 18px;
        color: var(--secondary-text-color);
        /* margin-left: 1%; */
      }

      </style>

      <div class="topbar layout horizontal justified center">
          <slot name="pre"></slot>
          <label class="flex">
              [[title]]
          </label>
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

customElements.define('form-title', FormTitle);