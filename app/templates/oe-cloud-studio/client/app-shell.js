import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import 'oe-message-handler/oe-message-handler.js';
import 'oe-i18n-msg/oe-i18n-msg.js';
import './styles/app-theme.js';
import './styles/shared-styles.js';
import 'oe-chart/oe-chart.js';
import 'oe-ui-misc/oe-widget-container.js';
import { ReduxMixin } from './mixins/redux-mixin.js';
import { navigateAction } from './scripts/state/actions.js';
import 'oe-radio-group/oe-radio-group.js';
import './src/controls/app-route';



/**
 *All Imports
 */

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import 'oe-input/oe-input.js';
import 'oe-input/oe-textarea.js';
import '@polymer/iron-iconset/iron-iconset.js';
import 'oe-mixins/oe-ajax-mixin.js';
import 'oe-combo/oe-combo.js';
import '@polymer/iron-icons/social-icons';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/iron-icons/maps-icons';
import 'oe-input/oe-decimal.js';
import 'oe-input/oe-json-input.js';
import '@polymer/paper-slider/paper-slider.js';
import 'oe-data-table/oe-data-table.js';
import 'oe-ui-forms/meta-polymer.js';
import '@polymer/iron-selector/iron-selectable.js';
import 'oe-info/oe-info.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import 'oe-mixins/form-mixins/oe-form-validation-mixin.js';
import 'oe-mixins/form-mixins/oe-model-handler.js';
import 'oe-mixins/form-mixins/oe-form-messages-mixin.js';
import '@polymer/paper-fab/paper-fab.js';
import 'oe-mixins/form-mixins/oe-screen-flow-mixin.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/neon-animation/neon-animated-pages.js';
import '@polymer/neon-animation/neon-animation.js';
import 'oe-ui-forms/validators/oe-block-validator.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import 'oe-checkbox/oe-checkbox.js';
import '@polymer/paper-spinner/paper-spinner.js';
import 'oe-toggle/oe-toggle.js';
import 'oe-date/oe-date.js';
import 'oe-combo/oe-combo.js';
import './styles/shared-styles.js';
import './common-imports.js';
import './src/controls/spinner-overlay.js';
import './src/landing-page.js';
import './app-icons.js';
import 'oe-side-nav/oe-side-nav';

import './src/controls/custom-input';

/**
 * @customElement
 * @polymer
 */
class AppShell extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors app-theme">
        :root {
            --accent-color:#4285f4;
            --light-primary-color: #4285f4;
        }
        app-toolbar {
            height: 63px;
            border-bottom: 1px solid #ccc;
        }

        app-drawer-layout {
            --app-drawer-layout-content-transition: margin 0.2s;
        }
 
         .drawer-content {
            padding-left: 16px;
            padding-right: 16px;
            margin-top: 80px;
            height: calc(100vh - 80px);
            overflow: auto;
        }

        .pages {
            background-color: white;
            height: calc(100vh - 64px);
            overflow: auto;
            width: 100vw;
        }




        paper-listbox  > paper-item.iron-selected {
            border-left : 3px solid var(--accent-color);               
        }
        paper-listbox  > paper-item {
         
            font-size: 12px;
        }
        paper-item.iron-selected {
                color: var(--light-primary-color);
             
            }
        paper-item> div {
            display: -ms-inline-grid;
        }
        iron-dropdown {
            border: 1px solid gray;
            background: white;
            font-size: 2em;
        }

        .dropdown-content {
            line-height: 25px;
            border-radius: 5px;
            box-shadow: 0px 2px 5px #ccc;

        }  
        .dropdown-content > paper-listbox > paper-item {
            background-color: #eeecec;
        }
        .dropdown-content > paper-listbox {
            padding: 0px;
        }
        .divider {
            width: 1px;
            height: 30px;
            margin: 6px 10px;
            padding: 0;
            background-color:  #e7e7e7;
         
        }

        paper-dialog {
            max-height: calc(100vh - 64px);
            outline: none; 
            z-index: 103;
            transform-origin: 0px 50% 0px; 
            box-sizing: border-box; 
           
            background-color: rgb(37, 37, 39);
        }
        .background {
            background-color: #353C48;
            color: white;
        }
        paper-dialog > paper-listbox {
            background-color: rgb(37, 37, 39);
            color: white;
            padding: 0px;
        }
        app-header {
            left: 0px;
            right: 0px;
            background: #fff;
        }

        .logo {
            width: 24px;
            height: 24px;
        }

        .app-title {
            color: #052169;
            font-weight: 500;
            cursor: pointer;
            margin-left: 8px;
        }

        .sidenav {
            --oe-side-nav-toolbar: {
                background-color: #3781c2;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
            }

            --oe-side-nav-item: {
                background-color: #3781c2;
            }

            --paper-item:{
              background-color: #3781c2;
              color: rgba(255, 255, 255, 0.8);
              letter-spacing: 0.7px;
            }

            --oe-side-nav-route-selected:{
              background-color:var(--accent-color);
              box-shadow: -16px 0px var(--accent-color);
              color: #FFFFFF;
              font-weight: bold;
            }
        }

        app-drawer[wide] {
          --app-drawer-width: 300px;
        }

        :host {
          --app-drawer-width: 60px;
        }

        [route-target] .iron-selected{
          height:calc(100vh - 64px);
          overflow:auto;
        }

    </style>
    
    <oe-message-handler fit-bottom duration=3000 persist-on="error,warning"></oe-message-handler>
    <spinner-overlay message="Loading..." with-backdrop no-cancel-on-esc-key no-cancel-on-outside-click opened={{showSpinner}}></spinner-overlay>
    <app-header-layout>
      <app-header fixed condenses effects="waterfall" slot="header" >
        <app-toolbar>
          <paper-icon-button icon="menu" on-tap="_handleOpenedChange"></paper-icon-button>
          <div class="layout flex horizontal center">
              <span class="app-title" on-tap="_goToHome">Config DB</span>
          </div>
        </app-toolbar>
      </app-header>
      <app-drawer-layout>
        <app-drawer wide$=[[wide]] id="drawer" slot="drawer">
          <oe-side-nav on-oe-side-bar-menu-click="_sidebarclick" class="sidenav" nested group-name="root" title="" on-navlink-clicked="_navlinkSelected"></oe-side-nav>
        </app-drawer>
        <div id="maincontent" class="content">
          <app-location route="{{route}}"></app-location>
          <app-route route="{{route}}">
              <iron-pages route-target attr-for-selected="route-path" selected="/" fallback-selection="404">
                  <landing-page route-path="/"></landing-page>
                  <div route-path="404">
                      <div class="error-card">
                          <paper-card>
                              <div class="card-content">
                                  <div class="page-not-found-wrapper layout flex center-center horizontal">
                                      404 X 404
                                  </div>
                                  <h1>Oops!</h1><br>
                                  <h3> We can't seem to find the page you are looking for You can return to <a href="/">home</a> instead.</h3>
                              </div>
                              <div class="card-actions">
                                  <a href="/">
                                      <paper-button>Home</paper-button>
                                  </a>
                              </div>
                          </paper-card>
                      </div>
                  </div>
              </iron-pages>
          </app-route>
        </div>
      </app-drawer-layout>
    </app-header-layout>
    `;
  }

  static get is() {
    return 'app-shell';
  }
  static get properties() {
    return {
      route: {
        type: Object
      },
      ajaxQueue: {
        type: Number,
        value: function () {
          return 0;
        }
      },
      list: {
        type: Array,
        value: function () {
          return [];
        }
      },
      showSpinner: {
        type: Number,
        statePath: 'activeRequests'
      },
      department: {
        type: Object,
        value: function () {
          return null;
        }
      },
      wide: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }
  connectCallback() {
    super.connectedCallback();
    this.addEventListener('start-spinner', this._startSpinner.bind(this));
    this.addEventListener('end-spinner', this._endSpinner.bind(this));
    this.addEventListener(
      'app-drawer-reset-layout',
      this._closeDrawer.bind(this)
    );
  }


  //= =============== Sidenav Actions ================
  _handleOpenedChange(event) {
    if (this.wide) {
      this.updateStyles({ '--app-drawer-width': '60px' });
      this.set('wide', false);
    } else {
      this.updateStyles({ '--app-drawer-width': '300px' });
      this.set('wide', true);
    }
  }

  _navlinkSelected(evt) {
    this.dispatch(navigateAction(evt.detail.url));
  }

  _closeDrawer(e) {
    this.$.drawer.set('opened', false);
  }

  _goToHome() {
    this.dispatch(navigateAction('/'));
  }

  _startSpinner(e) {
    this.ajaxQueue += 1;
    if (this.ajaxQueue > 0) this.set('showSpinner', true);
  }
  _endSpinner(e) {
    this.ajaxQueue -= 1;
    if (this.ajaxQueue === 0) this.set('showSpinner', false);
  }
}

window.customElements.define('app-shell', AppShell);
