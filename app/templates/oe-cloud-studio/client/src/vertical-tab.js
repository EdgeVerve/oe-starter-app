
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import {IronButtonState} from '@polymer/iron-behaviors/iron-button-state.js';
import {IronControlState} from '@polymer/iron-behaviors/iron-control-state.js';
import {PaperRippleBehavior} from '@polymer/paper-behaviors/paper-ripple-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

/*
  <vertical-tabs>
      <vertical-tab>Tab 1</vertical-tab>
      <vertical-tab>Tab 2</vertical-tab>
    </vertical-tabs>
*/
Polymer({
  _template: html`
    <style>
      :host {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        -ms-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        position: relative;
        padding: 0 16px;
        overflow: hidden;
        cursor: default;
        vertical-align:middle;
        min-height:36px;
      }

      :host(:focus) {
        outline: none;
      }

      :host([link]) {
        padding: 0;
      }

      .tab-content {
        width: 100%;
        transform: translateZ(0);
          -webkit-transform: translateZ(0);
        transition: opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1);
        @apply --paper-font-common-base;
        @apply --paper-font-menu;
      }

      :host(:not(.iron-selected)) > .tab-content {
        font-weight: 700;
        @apply --vertical-tab-content-unselected;
      }

      :host(.iron-selected) > .tab-content {
        font-weight: 700;
        color: var(--primary-color);
      }

      :host(:focus) .tab-content {
        opacity: 1;
        font-weight: 700;
      }

      .tab-content ::slotted(*) {
        min-height: 80px;
        border:2px solid red;
      }

      /* TODO */
      .tab-content > ::slotted(a) {
        @apply --layout-flex-auto;
        height: 100%;
      }
      
    </style>

    <div class="tab-content">
      <slot></slot>
    </div>
`,

  is: 'vertical-tab',

  behaviors: [IronControlState, IronButtonState, PaperRippleBehavior],

  properties: {

    /**
     * If true, the tab will forward keyboard clicks (enter/space) to
     * the first anchor element found in its descendants
     */
    link: {type: Boolean, value: false, reflectToAttribute: true}

  },

  /** @private */
  hostAttributes: {role: 'tab'},

  listeners: {down: '_updateNoink', tap: '_onTap'},

  attached: function() {
    this._updateNoink();
  },

  get _parentNoink() {
    var parent = dom(this).parentNode;
    return !!parent && !!parent.noink;
  },

  _updateNoink: function() {
    this.noink = !!this.noink || !!this._parentNoink;
  },

  _onTap: function(event) {
    if (this.link) {
      var anchor = this.queryEffectiveChildren('a');

      if (!anchor) {
        return;
      }

      // Don't get stuck in a loop delegating
      // the listener from the child anchor
      if (event.target === anchor) {
        return;
      }

      anchor.click();
    }
  }
});
