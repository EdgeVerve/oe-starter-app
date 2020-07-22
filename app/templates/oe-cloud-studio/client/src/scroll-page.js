import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { OECommonMixin } from 'oe-mixins/oe-common-mixin';

class ScrollPage extends OECommonMixin(PolymerElement) {
  static get template() {
    return html` 
      <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors">
        :host {
          display:block;
          height: 100%;
          overflow-y: auto;
          padding: 8px 16px;
          box-sizing: border-box;
        } 

      </style>
      <slot id="slot"></slot> 
    `;
  }

  static get properties() {
    return {
      selected: {
        type: String,
        notify: true,
        observer: '_selectedChanged'
      },
      attrForSelected: {
        type: String
      },
      _prevIndex: {
        type: Number,
        value: 0
      },
      scrolling: {
        type: Boolean,
        value: false
      }
    };
  }

  constructor() {
    super();
    this._calculateSelected = this.calculateSelected.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.$.slot.assignedElements) {
      this._slottedElements = this.$.slot.assignedElements();
    }
    else {
      this._slottedElements = [].slice.call(this.children);
    }
    this.selectedValues = this._slottedElements.map((elem) => {
      return elem.getAttribute(this.attrForSelected);
    });
    this.addEventListener('scroll', this._calculateSelected);
    this._prevScrollTop = 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('scroll', this._calculateSelected);
  }

  calculateSelected(event) {
    if (!this.dynamicScroll) {
      this.isScrollDown = this.scrollTop > this._prevScrollTop;
      this._prevScrollTop = this.scrollTop;
      this.debounce('scrollcalculate', function () {
        let rect = this.getBoundingClientRect();
        let scrollPageTop = rect.top;
        let __prevIndex = this._prevIndex;
        let scrollPageBottom = rect.bottom;
        const lastElement = this._slottedElements[this._slottedElements.length - 1];
        let lastRect = lastElement.getBoundingClientRect();
        if (this.scrollTop < 5) {
          const idx = 0;
          const element = this._slottedElements[idx];
          let selected = element.getAttribute(this.attrForSelected);
          this.scrolling = true;
          this.set('selected', selected);
          this.scrolling = false;
          this._prevIndex = idx;
        }
        else if (lastRect.bottom - scrollPageBottom < 5) {
          let selected = lastElement.getAttribute(this.attrForSelected);
          this.scrolling = true;
          this.set('selected', selected);
          this.scrolling = false;
          this._prevIndex = this._slottedElements.length - 1;
        }
        else if (!this.isScrollDown && __prevIndex != 0) { // scrollup and if not first element in the slot
          const idx = __prevIndex - 1;
          const element = this._slottedElements[idx];
          if (scrollPageTop <= element.getBoundingClientRect().top && this.attrForSelected) {
            let selected = element.getAttribute(this.attrForSelected);
            this.scrolling = true;
            this.set('selected', selected);
            this.scrolling = false;
            this._prevIndex = idx;
          }
        } else if (this.isScrollDown && __prevIndex != this._slottedElements.length - 1) { // if not last element in the slot
          const idx = __prevIndex + 1;
          const element = this._slottedElements[idx];
          if (scrollPageTop >= element.getBoundingClientRect().top && this.attrForSelected) {
            let selected = this._slottedElements[idx].getAttribute(this.attrForSelected);
            this.scrolling = true;
            this.set('selected', selected);
            this.scrolling = false;
            this._prevIndex = idx;
          }
        }
      }, 100);
    }
  }

  _selectedChanged(newValue, oldValue) {
    if (this.scrolling) {
      return;
    }
    if (newValue && newValue !== oldValue && this.selectedValues) {
      this._prevIndex = this.selectedValues.indexOf(newValue);
      const elem = this.querySelector("[" + this.attrForSelected + "=" + newValue + "]");
      this.dynamicScroll = true;
      elem.scrollIntoView();
      // this.async(() => {
      //   this.dynamicScroll = false;
      //   var title = elem.querySelector('section-title');
      //   if (title.ripple) {
      //     title.ripple();
      //   }
      // });
    }
  }

}

window.customElements.define('scroll-page', ScrollPage);