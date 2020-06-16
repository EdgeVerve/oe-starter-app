/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-item/paper-item.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-icons/iron-icons.js";
 
class FtSideNavItem extends OECommonMixin(PolymerElement) {
  static get is() {
    return 'ft-side-nav-item';
  }
  static get template() {
    return html`
    <style>
    :host {
      width: 100%;
    }

    iron-icon {
      opacity: 0.54;

      --iron-icon-height: 18px;
      --iron-icon-width: 18px;
    }

    .icon {
      margin-right: 10px;
    }

    paper-item {
      position: relative;
      padding-right: 0;
    }

    paper-item .collapse-state-icon {
      position: absolute;
      right: 10px;
      padding: 15px 0;
      transition: 0.3s all ease-in;
    }

    paper-item.expanded .collapse-state-icon {
      transform: rotate(180deg);
    }

    paper-item div {
      color: inherit;
      width: 100%;
      height: 48px;
      text-decoration: none;
      cursor: pointer;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;

      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --oe-side-nav-route;
    }

    paper-item div.selected-route {
      color: var(--oe-side-nav-route-selected-color, --primary-color);
      @apply --oe-side-nav-route-selected;
    }

    .menu {
      position: relative;
    }

    .menu:hover {
      background: #fff;
      --paper-item: {
        color: #000;
      }
    }

    .menu:hover .submenu {
      display: block;
      position: fixed;
      left: var(--ft-side-nav-menu-hover-submenu-left-position, 64px);
      background: #fff;
      color: #000; 
      top: 184px; 
      bottom: 0px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-left: 0px;
      height: calc(100vh - 64px);
    }

    .submenu {
      display:none;
    }

    .title {
      width: calc(100% - 55px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  </style>

  <template is="dom-repeat" items={{navItems}} id="items">
    <div class="menu">
      <paper-item class$="[[_computeExpandedClass(item.opened, nested)]]" on-keydown="openPage">
        <div class$="[[_computeSelectedRouteClass(item,selectedRoute)]]" on-tap="_pageSelected" data-route="[[item.name]]">
          <iron-icon class="icon" icon=[[item.icon]]></iron-icon>
          <oe-i18n-msg class="title" msgid="[[item.label]]"></oe-i18n-msg>
        </div>
      </paper-item>

      <template is="dom-if" if=[[nested]]>
        <template is="dom-if" if="[[item.children.length]]">
          <paper-item class="submenu">
            <ft-side-nav-item no-links=[[noLinks]] nested=[[nested]] id="child-nav-item" selected-route={{selectedRoute}} nav-items={{item.children}}
              level=[[nextLevel]]></ft-side-nav-item>
          </paper-item>
        </template>
      </template>
    </div>
  </template>
  `;
  }
  static get properties() {
    return {
      /**
       * Array of navigation links to show.
       */
      navItems: {
        type: Array,
        value: function () {
          return [];
        }
      },
      /**
       * Contains the currently selected Route.
       */
      selectedRoute: {
        type: Object,
        notify: true
      },
      noLinks: {
        type: Boolean,
        value: false
      },
      /**
       * Current level of nav links.
       */
      level: {
        type: Number,
        value: 0
      },
      /**
       * Shows children in collapsible container if `true`.
       */
      nested: {
        type: Boolean,
        value: false
      }
    };
  }
  /**
   * Sets the clicked route to `selectedRoute` variable.
   * @param {Event} e change event from input.
   */
  _pageSelected(e) {
    var selectedRoute = e.model.item;
    this.set('selectedRoute', selectedRoute);

    if(selectedRoute.children && selectedRoute.children.length>0){
      e.model.set('item.opened', !e.model.item.opened);
    } else if(!this.noLinks && selectedRoute.url) {
      let event = new Event('navlink-clicked', {
        bubbles: true,
        cancelable: true,
        composed: true
      });
      event.detail = selectedRoute;
      this.dispatchEvent(event);
    }
  }
  /**
   * Opens the page associated with the item, when `enter` is pressed.
   * @param {Event} e change event from input.
   */
  openPage(e) {
    if (e.which == 13) {
      e.target.click();
      e.target.children[0].click();
    }
  }
  /**
   * compares the selected route and returns class name.
   * @param {Object} item compared with `selectedRoute` variable.
   * @param {Object} selectedRoute Contains the currently selected Route.
   * @return {Object} selectedRoute.
   */
  _computeSelectedRouteClass(item, selectedRoute) {
    return item == selectedRoute ? 'selected-route' : '';
  }

  /**
   * Returns different icons for nested and non-nested side-nav.
   * @param {*} nested 
   */
  _getExpandIcon(nested){
    return nested? 'icons:expand-more': 'icons:chevron-right';
  }

  /**
   * opened has a value then it returns expanded class.
   * @param {item} opened property of item.
   * @return {HTMLElement} property of paper-item component.
   */
  _computeExpandedClass(opened, nested) {
    return opened && nested ? 'expanded' : '';
  }
  /**
   * Incrementing level to nextLevel.
   */
  /*global someFunction nextLevelFun:true*/
  /*eslint no-undef: "error"*/
  nextLevelFun() {
    this.nextLevel = this.level + 1;
  }
  /**
   * Connected callback to handle templating if custom template is present.
   */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change',this.nextLevelFun.bind(this));
  }
}
window.customElements.define(FtSideNavItem.is, FtSideNavItem);

