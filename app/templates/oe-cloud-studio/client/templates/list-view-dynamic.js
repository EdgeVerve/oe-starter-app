/* eslint-disable */
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { FTFormMixin } from '../mixins/form-mixin';
import '@polymer/polymer/lib/elements/dom-if.js';
import '../src/empty-row.js';
import '../src/form-footer.js';
import '../src/form-title.js';
import '../src/fields-group.js';
import '../src/controls/search-field.js';
import '../src/page-header.js';
import '../src/tool-bar.js';
import '../src/managed-list-view.js';
import { PageView } from '../src/page-view.js';
import '../src/scroll-page.js';
import '../src/scroll-section.js';
import '../src/section-title.js';
import '../src/vertical-tabs.js';
import '../src/vertical-tab.js';
import '../src/vtab-form.js';

/* META START
{
  "name": "List View Edit Dynamic",
  "description": "A template that facilitates listing, viewing and editing of data",
  "inputs": [{
      "name": "pageTitle",
      "required": true,
      "type": "string",
      "value": "Page Title"
    },
    {
      "name": "searchFields",
      "required": true,
      "type": "[string]",
      "value": ["name"]
    },
    {
      "name": "fetchUrl",
      "required": true,
      "type": "string",
      "value": "/api/<model-plural>"
    },
    {
      "name": "componentName",
      "type": "string"
    },
    {
      "name": "modelAlias",
      "required": true,
      "type": "string",
      "value": "viewdata"
    }
  ],
  "slots": [
    {
      "name": "list",
      "fieldType": "custom",
      "type": "data-table-column",
      "base": {
        "name": "data-table",
        "type": "advanced"
      }
    },
    {
      "name": "view",
      "fieldType": "display",
      "base": {
        "name": "field-set",
        "type": "container"
      }
    },
    {
      "name": "edit",
      "fieldType": "inputs",
      "base": {
        "name": "field-set",
        "type": "container"
      }
    }
  ]
}
META END*/

class __ClassName__ extends PageView(FTFormMixin(PolymerElement)) {
  static get template() {
    return html`@escape
  <style include="ft-shared-styles shared-styles iron-flex iron-flex-alignment iron-flex-factors">
  
    :host {
        display: block;
        box-sizing: border-box;
        overflow: hidden;
        height: calc(100vh - 64px);
        @apply --layout-vertical;
      }

      page-header {
        height : 64px;
      }

      .subpages {
        padding: 0px 16px;
        box-sizing: border-box;
      }

      .subpages > * {
        height:100%;
        padding-bottom:16px;
        box-sizing: border-box;
      }

      #datatable {
        height: 100%;
      }

      a{
          color: inherit;
      }
      </style>

  <page-header title="${metadata.pageTitle}">
      <template is="dom-if" if={{listMode}}>
         <paper-icon-button on-tap="_switchToNewMode" tabindex="-1" icon="add"></paper-icon-button>
      </template>
  <page-header>

  <iron-pages class="flex subpages" selected="[[page]]" attr-for-selected="name">
    <div id="list" page={{page}} name="list" class="layout vertical">
        <oe-ajax auto url="${metadata.fetchUrl}" handle-as="json" on-response="fetchSuccess"> </oe-ajax>

        <tool-bar> </tool-bar>

        <div class="flex data-table-wrapper">
        <oe-data-table slot="list" auto-fit pagination-type="page" page-size=15 hide-header="true" id="datatable" disable-selection disabled label="Nostro List"
                    row-actions=[[rowActions]] on-oe-data-table-row-action="handleRowActions" items={{filteredList}} >

          ${dom.slots.list.children.map(generateTableColumn).join('\n')}
        </oe-data-table>
        </div>
    </div>
    <div id="inquiry" page={{page}} name="inquiry" class="layout vertical">
        <vtab-form class="flex">
            <form-title slot="header" title="[[formTitle]]">
              <paper-icon-button slot="pre" on-tap="_switchToListMode" icon="arrow-back"></paper-icon-button>

              <div class="flex layout horizontal center">
                <paper-icon-button on-tap="_goPrev" icon="icons:chevron-left"></paper-icon-button>
                [[currentSerial]] of [[totalRecords]]
                <paper-icon-button on-tap="_goNext" icon="chevron-right"></paper-icon-button>
              </div>
              <paper-icon-button on-tap="_switchToEditMode" icon="editor:mode-edit"></paper-icon-button>
            </form-title>

            <vertical-tabs slot="tabs" attr-for-selected="name" selected={{scrollEditSection}}>
              ${generateTabs(dom.slots.view)}
            </vertical-tabs>

            <scroll-page class="scroll-container" selected={{scrollEditSection}} attr-for-selected="name">
              
              ${generateDomForNodes(dom.slots.view.children, metadata.modelAlias)}
            </scroll-page>
        </vtab-form>
    </div>
    <div id="form" page={{page}} name="form" class="layout vertical">
      <vtab-form class="flex">
        <form-title slot="header" title="[[formTitle]]">
          <paper-icon-button on-tap="_doCancel" icon="close"></paper-icon-button>
        </form-title>    
        <scroll-page class="scroll-container" selected={{scrollFormSection}} attr-for-selected="name">
          
          ${generateDomForNodes(dom.slots.edit.children, metadata.modelAlias)}
        </scroll-page>
      </vtab-form>

      <form-footer slot="footer">
        <paper-button on-tap="_doCancel">
          <oe-i18n-msg msgid="Cancel"></oe-i18n-msg>
        </paper-button>
        <paper-button primary on-tap="doSave">
          <oe-i18n-msg msgid="Save"></oe-i18n-msg>
        </paper-button>
      </form-footer>
    </div>
  </iron-pages>
  @escape`;
  }

  static get is() {
    return '${metadata.componentName}';
  }

  static get properties() {
    return {
      page: {
        type: String,
        value: 'list'
      },
      list: {
        type: Object,
        notify: true
      },
      scrollEditSection: {
        type: String,
        value: 'general'
      },
      scrollFormSection: {
        type: String,
        value: 'general'
      },
      selectedRow: {
        type: Object,
        value: null,
        notify: true
      },
      currentSerial: {
        type: Number,
        value: 1
      },
      editMode: {
        type: Boolean,
        value: false
      },
      rowActions: {
        type: Array,
        notify: true,
        value: [{
          icon: 'launch',
          action: 'details',
          title: 'details'
        }]
      },
      filteredList: {
        type: Object,
        notify: true
      },
      '${metadata.modelAlias}': {
        type: Object,
        notify: true,
        value: function () {
          return {};
        }
      },
      listMode:{
        type:Boolean,
        computed: '__isListMode(page)'
      },
      __Properties__: {}
    };
  }
  __isListMode(page){
    return page === "list";
  }

  constructor() {
    super();
    this.disableAutoVersion = true;
  }

  static get observers() {
    return [__Observers__];
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('search-changed', this._searchChanged.bind(this));
    this.addEventListener('oe-formdata-inserted', this._saveSuccess.bind(this));
    this.addEventListener('oe-formdata-updated', this._updateSuccess.bind(this));
    this.set('modelAlias', '${metadata.modelAlias}');
    this.set('resturl', '${metadata.fetchUrl}');
  }

  _searchChanged(e) {
    this.set('searchText', e.detail.toLowerCase());

    //this._filterList();
  }

  _filterList() {
    if (!this.searchText) {
      this.set('filteredList', this.list);
    }
    this.set('filteredList', this.list.slice());
    this.set('totalRecords', this.filteredList.length);
  }

  _saveSuccess(e) {
    this.push('list', e.detail.data);

    this._filterList();

    this.set('totalRecords', this.filteredList.length);
    this.set('page', 'list');
  }

  _updateSuccess(e) {
    if (this.searchText) {
      let found = this.list.findIndex(function (item) {
        return item.fbo_number === e.detail.data.fbo_number;
      });
      this.splice('list', found, 1, e.detail.data);
    } else {
      this.splice('list', this.selectedRowIndex, 1, e.detail.data);
    }

    this.splice('filteredList', this.selectedRowIndex, 1, e.detail.data);
    this.set('page', 'list');
  }

  _goNext(e) {
    if (this.currentSerial < this.filteredList.length) {
      this.set('currentSerial', this.currentSerial + 1);
      this.set('selectedRowIndex', this.selectedRowIndex + 1);
      this.set('selectedRow', this.filteredList[this.selectedRowIndex]);
      this.set('${metadata.modelAlias}', Object.assign({}, this.selectedRow));
      this.set('formTitle', this.selectedRow.name);
    }
  }

  _goPrev(e) {
    if (this.currentSerial > 1) {
      this.set('currentSerial', this.currentSerial - 1);
      this.set('selectedRowIndex', this.selectedRowIndex - 1);
      this.set('selectedRow', this.filteredList[this.selectedRowIndex]);
      this.set('${metadata.modelAlias}', Object.assign({}, this.selectedRow));
      this.set('formTitle', this.selectedRow.name);
    }
  }

  fetchSuccess(e) {
    this.set('list', e.detail.response);
    this.set('filteredList', this.list);
    this.set('totalRecords', this.list.length);
  }

  handleRowActions(e) {
    this.selectedRow = e.detail.row;

    this.selectedRowIndex = e.detail.rowIndex;
    this.set('currentSerial', this.selectedRowIndex + 1); // e.detail.action

    this.set('${metadata.modelAlias}', Object.assign({}, this.selectedRow));
    this.set('formTitle', this.selectedRow.name);
    this.set('page', 'inquiry');
  }

  _switchToEditMode(e) {
    this.set('editMode', true);
    this.set('page', 'form');
  }

  _switchToListMode(e) {
    this.set('editMode', false);
    this.set('page', 'list');
  }

  _switchToNewMode(e) {
    this.set('formTitle', 'New Record');
    super.handleNew();
    this.set('page', 'form');
  }

  _doCancel(e) {
    if (this['`${metadata.modelAlias}`'] && this['`${metadata.modelAlias}`'].fbo_number && this['`${metadata.modelAlias}`'].fbo_number > 0) {
      this.set('page', 'inquiry');
    } else {
      this.set('editMode', false);
      this.set('page', 'list');
    }
  }

  _addNewSubFboRecord(e) {
    if (!e.currentTarget.dataset.actionTarget) {
      return console.warn('data-action-target attribute not found on trigger element');
    }
    var subFboManager = this.$[e.currentTarget.dataset.actionTarget];
    if (!subFboManager || !subFboManager.newRecord) {
      return console.warn('data-action-target attribute does not point to subfbo manager');
    }
    subFboManager.newRecord();
  }
  __Functions__() { }
}

window.customElements.metadefine(__ClassName__.is, __ClassName__);