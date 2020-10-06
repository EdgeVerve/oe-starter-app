import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { OECommonMixin } from 'oe-mixins/oe-common-mixin.js';
import { OEAjaxMixin } from 'oe-mixins/oe-ajax-mixin';
import "@polymer/polymer/lib/elements/dom-repeat.js";

/**
 * `landing-page`
 *  A template element , used to create oe-ui Polymer 3 elements.
 *  By default includes `OECommonMixin` to support use of 'fire','async' and '_deepValue' functions.
 *
 *
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class LandingPage extends OEAjaxMixin(OECommonMixin(PolymerElement)) {
  static get is() { return 'landing-page'; }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
    :host{
      background:#EEE;
    }

    .navigation-container{
      box-sizing: border-box;
      height: 100%;
    }

    .navigation-cards{
      width:30%;
      min-height: 200px;
      margin:8px;
      cursor:pointer;
    }

    .navigation-cards:hover{
      box-shadow:var(--paper-material-elevation-2_-_box-shadow);
    }

    .card-content{
      padding: 8px 16px;
    }
    
    .nav-group-fieldset{
      margin:16px;
    }
    </style>
    <div>
      <dom-repeat items=[[navLinkGroups]] as="navGroup">
        <template>
          <fieldset class="nav-group-fieldset">
            <legend>[[navGroup.label]]</legend>
            <div class="navigation-container layout horizontal wrap justified ">
              <dom-repeat items=[[navGroup.children]]>
                <template>
                  <paper-card heading="[[item.label]]" class="navigation-cards" on-tap="_handleNavigate">
                    <div class="card-content">
                      <label> Navigate to [[item.url]] </label>
                    </div>
                  </paper-card>
                </template>
              </dom-repeat>
            </div>
          </fieldset>
        </template>
      </dom-repeat>
    </div>
    `;
  }

  constructor() {
    super();
    let filter = { "where": { "topLevel": true, "or": [{ "group": "root" }, { "group": "*" }] }, "include": { "relation": "children", "scope": { "include": { "relation": "children" } } }, "order": "sequence ASC" };
    this.makeAjaxCall('/api/NavigationLinks', 'GET', null, null, { filter: filter }, null, (err, resp) => {
      if (err) {
        this.fire('oe-show-error', err);
      } else {
        this.set('navLinkGroups', resp.filter(nav => {
          return nav.url === "";
        }));
      }
    });
  }

  __handleNavigationLinks(navLinks) {



  }


  _handleNavigate(event) {
    let nav = event.model.item;
    window.oe_navigate_to(nav.url);
  }
}

window.customElements.define(LandingPage.is, LandingPage);
