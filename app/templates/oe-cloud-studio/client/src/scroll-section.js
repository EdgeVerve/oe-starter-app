import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ScrollSection extends PolymerElement {
  static get template() {
    return html` 
      <style include="shared-styles">
        :host {
          display:block;
        }
      </style>
      
      <slot></slot>
    `;
  }
}

window.customElements.define('scroll-section', ScrollSection);