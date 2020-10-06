import { html} from '@polymer/polymer/polymer-element.js';
import { SessionMixin } from '../mixins/oe-session-mixin.js';
import { OECommonMixin } from 'oe-mixins/oe-common-mixin';  
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

const PageViewMix = function (BaseClass) {
  return class extends OECommonMixin(SessionMixin(BaseClass)) {
    static get pageStyles() {
      return html`
      <style>
      :host {
        display: block;
        padding: 0px 16px;
        box-sizing: border-box;
        overflow: hidden;
        height: calc(100vh - 64px);
      }

      iron-pages {
        height:100%;
      }

      iron-pages > * {
        height:100%;
        padding-bottom:16px;
      }

      </style>
    `;
    }

    static get smallPageStyles() {
      return html`
      <style>
      :host {
        display: block;
        padding: 0px 16px;
        box-sizing: border-box;
        overflow: hidden;
        height: calc(100vh - 64px);
      }

      iron-pages {
        height:100%;
      }

      iron-pages > * {
        height:100%;
      }

      </style>
    `;
    }

  };
};

const PageView = dedupingMixin(PageViewMix);
var pageView = {
  PageView: PageView
};
export { pageView as $pageView, PageView };