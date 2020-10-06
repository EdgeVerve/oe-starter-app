import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-location.js';
import 'oe-app-route/oe-app-route';
import 'oe-ajax/oe-ajax.js';
import './login-page.js';

/**
 * @customElement
 * @polymer
 */
class LoginShell extends (PolymerElement) {
  static get template() {
    return html`

    <style is="custom-style">
    </style>

    <div id="maincontent" class="content">
        <app-location route="{{route}}"></app-location>
        <oe-app-route route="{{route}}" config-url="/data/UIRoute-login.json">
            <iron-pages route-target></iron-pages>
        </oe-app-route>
    </div>
    `;
  }

  static get is() {
    return 'login-shell';
  }

  static get properties() {
    return {
      route: {
        type: Object
      }
    };
  }
}

window.customElements.define('login-shell', LoginShell);
