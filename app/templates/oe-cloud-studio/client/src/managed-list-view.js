import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';

import 'oe-data-table/oe-data-table.js';
import 'oe-ui-forms/validators/oe-block-validator.js'
import {
  OECommonMixin
} from 'oe-mixins/oe-common-mixin';

class ManagedListView extends OECommonMixin(PolymerElement) {

  static get is() {
    return 'managed-list-view';
  }

  static get template() {
    return html `
      <style>
      paper-dialog.size-position {
          max-width: 700px;
          overflow: auto;
        }
  </style>
      <oe-data-table columns=[[columns]] on-oe-data-table-row-clicked="_rowClicked" hide-header id="datatable" disable-selection disabled label="Charges List"
                row-actions=[[rowActions]] on-oe-data-table-row-action="_handleRowActions" items={{items}} page-size=9>
        <slot name='columns'></slot>
      </oe-data-table>

      <paper-dialog id="editor"  class="size-position">
        <oe-block-validator id="fieldsblock">
          <slot name='fields'></slot>
        </oe-block-validator>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button autofocus on-tap="_dialogAccept">OK</paper-button>
        </div>
      </paper-dialog>
      <slot></slot>
    `
  }

  static get properties() {
    return {
      items: {
        type: Array,
        notify: true
      },
      selectedItem: {
        type: Object,
        notify: true
      },
      selectedIndex: {
        type: Number,
        notify: true
      },
      rowActions: {
        type: Array,
        value: [{
          icon: 'launch',
          action: 'details',
          title: 'details'
        }]
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    this.set('columns', this._extractColumns());
  }

  _kebabCaseToCamelCase(str) {
    return str.replace(/-([a-z])/g, function (group) {
      return group[1].toUpperCase();
    });
  }

  /** Code copied from oe-data-table */
  _extractColumns() {
    var columns = [];
    //Get column info from child elements
    var _columnInfoContent = this.querySelectorAll('oe-data-table-column');
    if (_columnInfoContent && _columnInfoContent.length > 0) {
      var self = this;
      var attributesToSkip = ['class', 'id'];
      [].forEach.call(_columnInfoContent, function (columnDInfo) {
        var attributes = columnDInfo.attributes;
        var column = {};
        for (var j = 0, al = attributes.length; j < al; j++) {
          var attribute = attributes[j];
          if (attributesToSkip.indexOf(attribute.name) == -1) {
            column[self._kebabCaseToCamelCase(attribute.name)] = attribute.value;
          }
        }
        column.disabled = columnDInfo.hasAttribute('disabled');
        column.readOnly = columnDInfo.hasAttribute('read-only');
        column.hidden = columnDInfo.hasAttribute('hidden');
        column.valueAsTooltip = columnDInfo.hasAttribute('value-as-tooltip');
        columns.push(column);
      });
    }
    return columns;
  }

  _rowClicked(e) {
    this.set('selectedItem', e.detail.row);
    this.selectedIndex = e.detail.rowIndex;
  }

  _handleRowActions(e) {
    if (e.detail.action.action == "delete") {
      this.splice('items', e.detail.rowIndex, 1);
    } else {
      // take a copy 
      this.set('selectedItem', JSON.parse(JSON.stringify(e.detail.row)));
      this.selectedIndex = e.detail.rowIndex;
      this.$.editor.open();
    }
  }

  newRecord() {
    this.set('selectedItem', {});
    this.selectedIndex = -1;
    this.$.editor.open();
  }

  _dialogAccept(e) {
    var self = this;
    this.$.fieldsblock.validateForm().then(function (result) {

      if (result.valid) {
        if (self.selectedIndex == -1) {
          self.push('items', self.selectedItem);
        } else {
          self.splice('items', self.selectedIndex, 1, self.selectedItem);
        }
        self.$.editor.close();
      } else {
        self.fire('oe-show-error', {code: result.message, message: result.message, placeholders: result.control});
      }

    }, function (err) {
      self.fire('oe-show-error', err);
    })
  }
}

window.customElements.define(ManagedListView.is, ManagedListView);