import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { OECommonMixin } from 'oe-mixins/oe-common-mixin.js';

/* META START
{
  "name": "Simple template",
  "description": "A template with simple div",
  "inputs": [{
      "name": "pageTitle",
      "required": true,
      "type": "string",
      "value": "Page Title"
    },
    {
      "name": "componentName",
      "type": "string"
    }
  ],
  "slots": [
    {
      "name": "simple",
      "base": {
        "name": "div",
        "type": "container",
        "children": []
      }
    }
  ]
}
META END*/

class __ClassName__ extends OECommonMixin(PolymerElement) {
  static get is() {
    return '${metadata.componentName}';
  }

  static get template() {
    return html`@escape
    <style include="iron-flex iron-flex-alignment">
    #container{
      min-height:300px;
    }
    </style>
    <h3>${metadata.pageTitle}</h3>
    <template is="dom-if" if=[[showUI]]>
      <div id="container">
          ${generateDomForNodes(dom.slots.simple.children, '')}
      </div>
    </template>
    @escape`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('oe-route-change',()=>{
      this.set('showUI',true);
    });
  }
}
window.customElements.define(__ClassName__.is, __ClassName__);