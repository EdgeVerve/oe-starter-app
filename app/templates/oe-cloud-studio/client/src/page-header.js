import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class PageHeader extends PolymerElement {
  static get template() {
    return html` 
        <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors">

                :host {
                  @apply --layout-horizontal;
                  @apply --layout-center;
                  width: 100%;
                  position: relative;
                  height: 64px;
                  padding: 0 16px;
                  pointer-events: none;
                  font-size: var(--app-toolbar-font-size, 20px);
                  box-sizing: border-box;
                }

                :host ::slotted(*) {
                  pointer-events: auto;
                }

                .wrapper {
                    @apply --layout-horizontal;
                    @apply --layout-center;
                    width: 100%;
                    height: 64px;
                    box-sizing: border-box;
                    border-bottom : 1px solid #DDD;
                };

                label {
                    @apply --paper-font-title;
                    color : var(--primary-color);
                }

        </style>
       
                <div class="wrapper">
                    <slot name="pre"></slot>
                    <label class="toptitle flex">[[title]]</label>
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

window.customElements.define('page-header', PageHeader);
