/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "oe-i18n-msg/oe-i18n-msg.js";
import "@polymer/paper-menu-button/paper-menu-button.js"

import "@polymer/paper-tooltip/paper-tooltip.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/iron-selector/iron-selector.js";
import "oe-ajax/oe-ajax.js";
import "oe-input/oe-input.js";
import "@polymer/paper-ripple/paper-ripple.js";

import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import { OEAjaxMixin } from "oe-mixins/oe-ajax-mixin.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js"; 

/**
 * create include filter by checking level.
 * @param {Object} obj property of filter object.
 * @param {number} level .
 * 
 */
var buildIncludeFilter = function (obj, level) {
  if (level == 1) return;
  obj.scope = {
    include: {
      relation: 'children'
    }
  };
  buildIncludeFilter(obj.scope.include, --level);
};

class FtSideNav extends OEAjaxMixin(OECommonMixin(PolymerElement)) {

  static get is() {
    return 'ft-side-nav';
  }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment iron-flex-layout">
      :host {
        display: block;
        height: calc(100vh - 64px);
        top: 64px;
        position: relative;
        background-color: var(--light-primary-color);
        color: #ffffff;
      }

      paper-listbox {
        padding: 0;
        width:100%;
      }
  
      iron-icon {
        opacity: 0.54;
  
        --iron-icon-height: 18px;
        --iron-icon-width: 18px;
      }
  

/*
      .section-bar {
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
      }*/

      .menu {
        width: 192px;
        padding-left: 12px;
        padding-right: 36px;
        box-sizing: border-box;
      }

      .menu-item {
        font-size: 12px;
        cursor: pointer;
        padding: 4px;
        opacity: 0.7;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      /*color: var(--light-theme-divider-color)*/

      .menu-item:hover {
        opacity: 1;
        background-color: var(--google-blue-300);
        color: var(--text-primary-color);
      }

      .menu-item[disabled] {
        pointer-events: none;
        opacity: 0.3;
      }

      .menu-heading {
        padding-top: 30px;
        margin-right: 20px;
        /*border-bottom: 1px solid var(--divider-color);*/
        font-size: 10px;
        opacity: var(--dark-primary-opacity);
      }

      .section-heading {
        text-align: right;
        padding: 10px 10px 0px 0px;
      }

      .section-selector {
        opacity: var(--dark-primary-opacity);
      }

      .section-selector.iron-selected {
        opacity: var(--light-primary-opacity);
        background-color: var(--google-blue-300);
      }

      paper-menu-button {
        padding: 0px;
      }
    </style>
  
    <a id="anchorTag" hidden></a>
      
    <div class="layout horizontal">
      <div class="section-bar">
      <iron-selector class="layout vertical" selected={{selectedItem}} attr-for-selected="data-index">
        <template is="dom-repeat" items={{navTree}}>
          <paper-icon-button class="section-selector" icon=[[item.icon]] data-index=[[index]] on-tap="_sectionSelected"></paper-icon-button>
          <paper-tooltip>[[item.label]]</paper-tooltip>
        </template>
      </iron-selector>
      </div>
      <iron-pages selected={{selectedItem}} attr-for-selected="section">
        <template is="dom-repeat" items={{navTree}}>
          <div section=[[index]] class="layout vertical">
            <span class="section-heading">[[item.label]]</span>
            <div class="layout horizontal wrap">
              <template is="dom-repeat" items={{item.children}}>
                <div class="menu layout vertical">
                  <span class="menu-heading">[[item.label]]</span>
                  <div class="layout vertical">
                    <template is="dom-repeat" items={{item.children}}>
                      <template is="dom-if" if=[[!item.children.length]]>
                        <div class="menu-item" disabled$=[[!_hasValue(item.url)]] on-tap="_menuItemSelected">
                          <span>[[item.label]]</span>
                          <paper-ripple></paper-ripple>
                        </div>
                      </template>

                      <template is="dom-if" if=[[item.children.length]]>

                      <div class="layout horizontal menu-item">
                        
                        <paper-menu-button>

                          <div class="layout horizontal" slot="dropdown-trigger">   
                          <span class="layout flex">[[item.label]]</span>                       
                            <iron-icon icon="chevron-right"></iron-icon>
                          </div>
                          <paper-listbox slot="dropdown-content">
                            <template is="dom-repeat" items={{item.children}}>
                              <div class="menu-item" disabled$=[[!_hasValue(item.url)]] on-tap="_menuItemSelected">
                                <span>[[item.label]]</span>
                                <paper-ripple></paper-ripple>
                              </div>
                            </template>
                          </paper-listbox>
                        </paper-menu-button>
                      </div>
                      </template>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </iron-pages>
    </div>
      `;
  }
  static get properties() {
    return {
      navTree: {
        type: Array
      },
      selectedItem: {
        type: Number,
        value: -1
      },
      /**
       * URL to fetch Navigation Links.
       */
      restUrl: {
        type: String
      },
      /**
       * Name of group to fetch.
       */
      groupName: {
        type: String,
        value: '_app_nav_group_',
        observer: '_groupNameChanged'
      },

      /**
       * Set to true, When size-nav is linked directly to iron-pages and nav-items need not trigger location change 
       */
      noLinks: {
        type: Boolean,
        value: false
      }
    };
  }

  _sectionSelected(evt){
    this.updateStyles({'--app-drawer-width': '424px'});
    /* parent is app-drawer */
    this.parentElement.updateStyles({'--app-drawer-width': '424px'});
  }

  _hasValue(value){
    return !!value;
  }

  _menuItemSelected(evt){
    if(!this.noLinks) {
      if(evt.model.item.url) {
        this.$.anchorTag.href = evt.model.item.url;
        this.$.anchorTag.click();  
      } else {
        this.fire('oe-show-error', 'Not implemented');
      }
    }
    this.fire('navlink-selected', evt.model.item);
    this.set('selectedItem', -1);
    this.updateStyles({'--app-drawer-width': '40px'});
    this.parentElement.updateStyles({'--app-drawer-width': '40px'});
  }
  /**
   * invokes _getNavLinks method.
   * @param {string} newgroup string sent as parameter.
   */
  _groupNameChanged(newgroup) {
    this._getNavLinks();
  }
  /**
   * Fetches the nav links based on a `parent`.
   * @param {string} parent used to build filter params.
   */
  _getNavLinks(parent) {
    var self = this;

    var requestUrl = this.restUrl;
    var queryParams = {};
    if(!requestUrl) {
      var restApiRoot = (window.OEUtils && window.OEUtils.restApiRoot) ? window.OEUtils.restApiRoot : '/api';
      requestUrl = restApiRoot + '/NavigationLinks';
      queryParams.filter = self._buildFilterParams(parent);
    }
     
    self.makeAjaxCall(requestUrl, 'get', null, null, queryParams, 'json',
      function (err, res) {
          self.set('navTree', res || []);
        }
    );
  }
  /**
   * Builds filter params to fetch `Navigation Link`.
   * @param {string} parent .
   * @return {Object} filter .
   */
  _buildFilterParams(parent) {
    var filter = {};
    filter.where = parent ? {
      parent: parent
    } : {
        topLevel: true
      };
    if (!parent) {
      var includeFilter = {
        relation: 'children'
      };
      buildIncludeFilter(includeFilter, 4);
      filter.include = includeFilter;
    }

    if (this.groupName && this.groupName !== '*') {
      filter.where.or = [{ group: this.groupName }, { group: '*' }];
    } else {
      filter.where.group = '*';
    }
    filter.order = 'sequence ASC';
    return filter;
  }

  /**
   * Connected callback to handle templating if custom template is present.
   */
  connectedCallback() {
    super.connectedCallback();
    this._getNavLinks(undefined);
  }
}
window.customElements.define(FtSideNav.is, FtSideNav);
