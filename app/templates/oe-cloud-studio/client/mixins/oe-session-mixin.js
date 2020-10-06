
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
/** @polymerMixin */
const SessionMix = function (BaseClass) {
  /**
  * @polymer
  * @mixinClass
  */
  return class extends BaseClass {
    static get properties() {
      return {
        session: {
          type: Object,
          value: function () {
            return sessionStorage;
          }
        }
      }
    }
  };
}
export const SessionMixin = dedupingMixin(SessionMix);