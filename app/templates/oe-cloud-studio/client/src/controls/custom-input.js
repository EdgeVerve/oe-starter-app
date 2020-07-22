import "oe-input/oe-input";
import "oe-combo/oe-combo";
import "oe-input/oe-json-input";

let OeInput = customElements.get("oe-input");
let OeCombo = customElements.get("oe-combo");
let OeJsonInput = customElements.get("oe-json-input");


/**
 * Floats the label on focus according to material pattern
 * https://material.io/components/text-fields/#text-fields-states
 * 
 * 
 * @param {PolymerElement} baseKlass component to apply mixin
 */
let materialFloatInputMixin = baseKlass => class extends baseKlass {
  connectedCallback() {
    super.connectedCallback();
    this.__alwaysFloatLabel = this.alwaysFloatLabel;
    this.addEventListener("focus", this.__handleCustomFocus.bind(this));
    this.addEventListener("blur", this.__handleCustomFocus.bind(this));
  }

  __handleCustomFocus() {
    if (this.focused) {
      this.set('alwaysFloatLabel', true);
    } else {
      this.set('alwaysFloatLabel', this.__alwaysFloatLabel);
    }
  }

}


window.customElements.define("custom-oe-input", materialFloatInputMixin(OeInput));
window.customElements.define("custom-oe-combo", materialFloatInputMixin(OeCombo));
window.customElements.define("custom-oe-json-input", materialFloatInputMixin(OeJsonInput));