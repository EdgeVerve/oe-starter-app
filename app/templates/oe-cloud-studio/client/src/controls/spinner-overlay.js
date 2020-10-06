import {
  PolymerElement,
  html
} from '@polymer/polymer';
import {
  mixinBehaviors
} from '@polymer/polymer/lib/legacy/class.js';
import {
  IronOverlayBehavior
} from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';

import '@polymer/paper-spinner/paper-spinner.js';

class SpinnerOverlay extends mixinBehaviors(IronOverlayBehavior, PolymerElement) {
  static get template() {
      return html `
    <style>
      :host {
        background: none;
        width: 100%;
      }

      .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--spinner-backdrop-overlay-color, #FFF);
          opacity: var(--spinner-backdrop-overlay-opacity, 1);
          z-index: var(--spinner-backdrop-z-index, 1);
          @apply(--spinner-backdrop-overlay);
        }
        
      paper-spinner {
          --paper-spinner-layer-1-color: var(--spinner-backdrop-layer-1-color, --google-blue-500);
          --paper-spinner-layer-2-color: var(--spinner-backdrop-layer-2-color, --google-blue-500);
          --paper-spinner-layer-3-color: var(--spinner-backdrop-layer-3-color, --google-blue-500);
          --paper-spinner-layer-4-color: var(--spinner-backdrop-layer-4-color, --google-blue-500);
          --paper-spinner-stroke-width: var(--spinner-backdrop-stroke-width, 3px);
      }

      .textstyle {
          font-size: 20px;
      }
    </style>
    <div class="overlay" hidden$="[[!opened]]">
      <paper-spinner alt="[[alt]]" active="[[opened]]"></paper-spinner>

      <span class="textstyle">[[message]]</span>
    </div>
  `;
  }

  static get properties(){
      return {
          message: String
      }
  }
}
customElements.define('spinner-overlay', SpinnerOverlay);
