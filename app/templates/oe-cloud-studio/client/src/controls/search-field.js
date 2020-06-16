import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import { OECommonMixin } from 'oe-mixins/oe-common-mixin';

class SearchField extends OECommonMixin(PolymerElement) {
  static get template() {
    return html`
        <style>
        :host {
            height: 40px;
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
            width 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .searchbox {
            align-items: center;
            display: flex;
        }

        [hidden] {
            display: none !important;
        }

        button[is='paper-icon-button-light'],
        paper-icon-button {
            height: 32px;
            margin: 6px;
           min-width: 32px;
            padding: 6px;
            width: 32px;
        }

        #icon {
            transition: margin 150ms, opacity 200ms;
            color: black;
        }

        #prompt {
            opacity: 0;
        }

        paper-spinner-lite {
            height: var(--cr-icon-height-width_height);
            width: var(--cr-icon-height-width_width);
            --paper-spinner-color: white;
            margin: 0 6px;
            opacity: 0;
            padding: 6px;
            position: absolute;
        }

        paper-spinner-lite[active] {
            opacity: 1;
        }

        #prompt,
        paper-spinner-lite {
            transition: opacity 200ms;
        }

        #searchTerm {
            -webkit-font-smoothing: antialiased;
            -webkit-margin-start: 2px;
            flex: 1;
            line-height: 185%;
            position: relative;
        }

        label {
            bottom: 0;
            cursor: text;
            left: 0;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 0;
            white-space: nowrap;
            color: black;
            @apply(--paper-font-subhead);
        }

        :host([has-search-text]) label {
            visibility: hidden;
        }

        :host(:not([_narrow])) {
            -webkit-padding-end: 0;
            background-color: white;
            border: 1px solid #80808038;
            border-radius: 2px;
            cursor: text;
            min-width: 60px;
            color: black;
            color: white;
        }

        input {
            -webkit-appearance: none;
            border: none;
            font: inherit;
            outline: none;
            padding: 0;
            position: relative;
            width: 100%;
            background-color: transparent;
            @apply(--paper-font-subhead);
        }

        input[type='search']::-webkit-search-decoration,
        input[type='search']::-webkit-search-cancel-button,
        input[type='search']::-webkit-search-results-button {
            -webkit-appearance: none;
        }

        #clearSearch {
            color: black;
        }

        :host(:not([_narrow]):not([showing-search])) #icon,
        :host(:not([_narrow])) #prompt {
            opacity: 0.7;
        }

        :host([_narrow]:not([showing-search])) #searchTerm {
            display: none;
        }

        :host([showing-search][spinner-active]) #icon {
            opacity: 0;
        }

        :host([_narrow][showing-search]) {
            width: 100%;
        }

        :host([_narrow][showing-search]) #icon,
        :host([_narrow][showing-search]) paper-spinner-lite {
            -webkit-margin-start: 18px;
        }

        .dropdown-content> ::content {
            max-height: 240px;
        }

        .dropdown-content> ::content > paper-item:hover {
            background-color: var(--light-primary-color)
        }
        paper-item:hover {
            background-color: var(--light-primary-color)
            cursor: pointer;
        }

        paper-item.iron-selected {
            background-color: var(--light-primary-color)
        }
        </style>
        <div class="outer">
            <div class="searchbox">
                <dom-if id="spinnerTemplate">
                <template>
                    <paper-spinner-lite active="[[_isSpinnerShown]]">
                    </paper-spinner-lite>
                </template>
                </dom-if>
                <paper-icon-button id="icon" icon="search" title="[[label]]" tabindex$="[[_computeIconTabIndex(_narrow)]]"
                    aria-hidden$="[[_computeIconAriaHidden(_narrow)]]">
                </paper-icon-button>
                <div id="searchTerm">
                    <label id="prompt" for="searchInput" aria-hidden="true">[[label]]</label>
                    <input id="searchInput" autocomplete="off" aria-labelledby="prompt" type="search" on-input="_onSearchTermInput"
                        on-search="_onSearchTermSearch" on-keydown="_onSearchTermKeydown" on-focus="_onInputFocus"
                        on-blur="_onInputBlur" incremental="" autofocus="">
                </div>
                <dom-if if="[[_hasSearchText]]">
                <template>
                    <paper-icon-button tabindex="-1" icon="close" class="icon-cancel-toolbar" id="clearSearch" title="[[clearLabel]]"
                        on-tap="_clearSearch">
                    </paper-icon-button>
                </template>
                </dom-if>
            </div>

            <div>
                <iron-dropdown id="dropdown" vertical-offset="8" no-auto-focus opened="[[suggestions.length]]">
                    <paper-material slot="dropdown-content">
                        <paper-listbox id="menu">
                            <dom-repeat id="itemlist" items="{{suggestions}}">
                            <template>
                                <paper-item on-mouseover="_onMouseOver" on-tap="_onItemSelected" data-item={{item}}>
                                    <span>{{_getDisplayValue(item)}}</span>
                                </paper-item>
                            </template>
                            </dom-repeat>
                        </paper-listbox>
                    </paper-material>
                </iron-dropdown>
            </div>
        </div>`;
  }
  static get properties() {
    return {
      label: {
        type: String,
        notify: true
      },
      clearLabel: {
        type: String,
        value: ""
      },
      _hasSearchText: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      _lastValue: {
        type: String,
        value: ""
      },
      _narrow: {
        type: Boolean,
        reflectToAttribute: true
      },
      _showingSearch: {
        type: Boolean,
        value: false,
        notify: true,
        observer: "_showingSearchChanged",
        reflectToAttribute: true
      },
      _spinnerActive: {
        type: Boolean,
        reflectToAttribute: true
      },
      _isSpinnerShown: {
        type: Boolean,
        computed: "_computeIsSpinnerShown(_spinnerActive, _showingSearch)"
      },
      _searchFocused: {
        type: Boolean,
        value: false
      },
      suggestions: {
        type: Array,
        observer: '_suggestionsChanged'
      },
      displayproperty: {
        type: String
      },
      selectedItem: {
        type: Object,
        notify: true
      }

    }
  }
  connectedCallback() {
    super.connectedCallback();
  }
  _getValue() {
    return this._getSearchInput().value
  }
  _setValue(value, opt_noEvent) {
    var searchInput = this._getSearchInput();
    searchInput.value = value;
    this._onSearchTermInput();
    this._onValueChanged(value, !!opt_noEvent)
  }
  _onSearchTermSearch() {
    this._onValueChanged(this._getValue(), false)
  }
  _onSearchTermInput() {
    this._hasSearchText = this.$.searchInput.value != "";
    this._showingSearch = this._hasSearchText || this._isSearchFocused();
  }
  _onValueChanged(newValue, noEvent) {
    if (newValue == this._lastValue)
      return;
    this._lastValue = newValue;
    if (!noEvent) {
      this.fire('search-changed', newValue);
    }
    if (this.suggestions) {
      // console.log('suggestions ', this.suggestions);
    } else {
      // console.log('no suggestions ');
    }
  }
  _getSearchInput() {
    return this.$.searchInput
  }
  _isSearchFocused() {
    return this._searchFocused
  }
  _showAndFocus() {
    this._showingSearch = true;
    this._focus()
  }
  _focus() {
    this._getSearchInput().focus()
  }
  _computeIconTabIndex(_narrow) {
    return _narrow ? 0 : -1
  }
  _computeIconAriaHidden(_narrow) {
    return Boolean(!_narrow).toString()
  }
  _computeIsSpinnerShown() {
    var showSpinner = this._spinnerActive && this._showingSearch;
    if (showSpinner)
      this.$.spinnerTemplate.if = true;
    return showSpinner
  }
  _onInputFocus() {
    this._searchFocused = true
  }
  _onInputBlur() {
    this._searchFocused = false;
    if (!this._hasSearchText)
      this._showingSearch = false
  }
  _onSearchTermKeydown(e) {
    if (e.key == "Escape")
      this._showingSearch = false
  }
  _showSearch(e) {
    if (e.target != this.$.clearSearch)
      this._showingSearch = true
  }
  _clearSearch(e) {
    this._setValue("");
    this._focus()
  }
  _showingSearchChanged(current, previous) {
    if (previous == undefined)
      return;
    if (this._showingSearch) {
      this._focus();
      return
    }
    this._setValue("");
    this._getSearchInput().blur()
  }
  _suggestionsChanged(suggestions) {
    this.$.dropdown.style.width = this.offsetWidth + 'px';
  }
  _getDisplayValue(item) {
    var ret = item;
    if (ret && typeof ret == "object") {
      var prop = this.displayproperty || 'name';
      ret = ret[prop];
    }
    return ret ? ret.toString() : '';
  }
  _onMouseOver(e) {
    this.$.menu.select(e.model.index);
    this._getSearchInput().focus();
  }
  _onItemSelected(e) {
    this.set('selectedItem', e.model.item);
    this.$.dropdown.set('opened', false);
    this.fire('search-result-selected', e.model.item);
    e.stopPropagation();
  }

}
window.customElements.define('search-field', SearchField);