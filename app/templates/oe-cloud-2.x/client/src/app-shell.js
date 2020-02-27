import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-location.js';
import 'oe-app-route/oe-app-route';
import '@polymer/app-layout/app-layout.js';
import 'oe-ajax/oe-ajax.js';
import './home-page.js';

/**
 * @customElement
 * @polymer
 */
class AppShell extends (PolymerElement) {
  static get template() {
    return html`

    <style is="custom-style">

      #maincontent {
        padding: 10px;
      }
      .logo {
        height: 32px;
        padding: 14px;
    }

    </style>


    <app-drawer-layout>

      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
          <app-toolbar style="background: blue; color: white">
          <img class="logo" src="../img/logo.png" />
          </app-toolbar>
        </app-header>

        <div id="maincontent" class="content">
        <app-location route="{{route}}"></app-location>
        <oe-app-route route="{{route}}" config-url="/data/UIRoute.json">
        <iron-pages route-target>

        </iron-pages>

        </oe-app-route>
    </div>

      </app-header-layout>
    </app-drawer-layout>
  
    `;
  }

  static get is() {
    return 'app-shell';
  }

  static get properties() {
    return {
      route: {
        type: Object
      }
    };
  }
}

window.customElements.define('app-shell', AppShell);
