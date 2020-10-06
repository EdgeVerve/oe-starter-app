import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import 'oe-ajax/oe-ajax.js';
/**
 * `cache-loader`
 * 
 * @customElement
 * @polymer
 */

class CacheLoader extends OECommonMixin(PolymerElement) {
  static get is(){
    return 'cache-loader';
  }
  static get template() {
    return html`
      <oe-ajax url='/api/ListData/ALLENUMS' auto handle-as="json" on-response="_handleResponse" on-error="_handleError"></oe-ajax>
    `;
  }

  _handleResponse(evt) {
    var self = this;
    const listData = evt.detail.response;
    Object.keys(listData).forEach(key => {
      self.fire('oe-update-cache', {key: key, data: listData[key]});
    });
  }
  
  _handleError(evt) {
    this.fire('oe-show-error', 'Unable to fetch list data');
  }
}

window.customElements.define(CacheLoader.is, CacheLoader);