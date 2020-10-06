import {PolymerElement, html} from '@polymer/polymer';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
// import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

class FieldsGroup extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
      <style>
      
        :host {
          width:100%;
          min-height:16px;
          position: relative;
          display: flex;
          flex-flow: row wrap;
          box-sizing:border-box;
          justify-content:flex-start;
          margin-right:16px;
          --state-background: #e6878714;
          --state-border: #ff000045
        }
        :host(.border) {
            border: 0.5px solid rgb(0, 0, 0, var(--light-divider-opacity));
            border-radius: 3px;
            padding-left: 40px
        }
        :host(.padding-top) {
          padding-top: 8px;
        }
        :host(.padding-bottom) {
         padding-bottom: 8px;
        }
        :host(.padding-left) {
          padding-left: 8px;
        }
        :host(.padding-right) {
          padding-right: 8px;
        }
        :host ::slotted(*) {
            box-sizing:border-box;
            padding-right:32px;
            flex:2;
            min-width:270px;
            flex-basis: 300px;
            max-width:390px;
        }

        :host ::slotted([fld-xs]) {
            flex:1;
            min-width:100px;
            flex-basis: 150px;
            max-width:195px;
          }
        :host ::slotted([fld-ss]) {
            flex:2;
            min-width:200px;
            flex-basis: 220px;
            max-width:250px;
          }
        :host ::slotted([m-r]) {
            margin-right: 8px;
          }
        :host ::slotted([m-l]) {
            margin-left: 8px;
          }
        :host ::slotted([p-r]) {
            padding-right: 8px;
          }
        :host ::slotted([p-l]) {
            padding-left: 8px;
          }
        :host ::slotted([d-f]) {
          display: flex;
        }
        :host ::slotted([fw-b]) {
          font-weight: bold;
        }
        :host ::slotted([fld-s]) {
            flex:2;
            min-width:270px;
            flex-basis: 300px;
            max-width:390px;
          }
          :host ::slotted([fld-sm]) {
            flex:2;
            min-width:300px;
            flex-basis: 380px;
            max-width:400px;
          }
          :host ::slotted([fld-m]) {
            flex:3;
            min-width:405px;
            flex-basis: 450px;
            max-width:585px;
          }
          :host ::slotted([state]) {
            padding-inline-end: 8px;
            background-color: var(--state-background);
            border: 1px solid var(--state-border);
            margin-inline-end: 8px;
            border-radius: 27px;
            padding-top: 6px;
            padding-left: 8px;
            padding-bottom: 6px;
            text-align: center;
          }
          :host ::slotted([fld-l]) {
            flex:4;
            min-width:540px;
            flex-basis: 600px;
            max-width:780px;
          }
          
          :host > fields-row {
              flex-basis: 300px;
              min-width : 220px;
              max-width:600px;
              flex-grow: 6;
              margin-left:8px;
              margin-right:8px;
          }

          :host > :empty-row {
              flex-basis: 900px;
              min-width : 220px;
              flex-grow: 6;
          }

          @media (min-width: 1080px) {
              #dialog {
                min-width: 435px;
              };
          }
      </style>
      <slot></slot>
    `;
  }

  static get properties() {
    return {
      columns: {
        type: String,
        reflectToAttribute: true
      },
      width: Number,
      height: Number
    };
  }

  constructor() {
    super();
    this.columns = "multi";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-resize', this.onIronResize.bind(this));
  }

  onIronResize() {
    this.width = this.offsetWidth;
    this.height = this.offsetHeight;
  }

}

customElements.define('fields-group', FieldsGroup);
