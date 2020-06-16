
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-styles/default-theme.js';

import {IronMenuBehavior} from '@polymer/iron-menu-behavior/iron-menu-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

/**
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
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        height: 100%;
        font-size: 14px;
        font-weight: 500;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        border-right: 1px solid rgba(10, 11, 49, 0.20);
        min-width:120px;
        /* margin-left: 1%; */
      }

      :host ::slotted(.iron-selected)  {
          border-right: 2px solid var(--primary-color);
      }

      #tabsContainer {
          width : 100%;
          border-right: 1px solid rgba(10, 11, 49, 0.20);
      }

    </style>

    <div id="tabsContainer" class="flex">
            <slot></slot>
    </div>
`,

  is: 'vertical-tabs',
  behaviors: [IronMenuBehavior],

  /** @private */
  hostAttributes: {
    role: 'listbox'
  }
});
