import {PolymerElement, html} from '@polymer/polymer';

class SectionTitle extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment" >
      
      :host {
          display:block;
          margin-top: 6px;
          margin-bottom: 16px;
          position:relative;
          @apply --paper-font-common-base;
          @apply --paper-font-menu;
          border-bottom: 0.5px solid rgb(0, 0, 0, var(--light-divider-opacity));
          @apply --section-title-mixin;
        }

        :host ::slotted(*) {
            @apply --paper-font-common-base;
            @apply --paper-font-menu;
        }

        .sectitle {
          @apply --paper-font-title;
          font-size: 16px;
          @apply --section-title-label-mixin;
        }

      </style>

       <div class="layout horizontal justified center">
          <div>
            <slot name="pre"></slot>
            <label class="sectitle flex">[[title]]<paper-ripple id="ripple"></paper-ripple></label>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
    `;
  }

  static get properties() {
    return {
      scrollIndex: {
        type: String
      },
      title: String
    };
  }

  ripple() {
    this.$.ripple.simulatedRipple();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

}

customElements.define('section-title', SectionTitle);