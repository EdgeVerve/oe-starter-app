import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
/** @polymerMixin */
const PageAnimation = function (BaseClass) {
  /**
	 * @polymer
	 * @mixinClass
	 */
  return class extends BaseClass {
    changeAnimation(entryAnimation, exitAnimation) {
      var pages = this.shadowRoot.querySelector('neon-animated-pages');
      pages.setAttribute('entry-animation', entryAnimation || 'slide-from-right-animation');
      pages.setAttribute('exit-animation', exitAnimation || 'slide-left-animation');
    }
    selectedPage(pageIndex) {
      var pages = this.shadowRoot.querySelector('neon-animated-pages');
      pages.setAttribute('selected', pageIndex);
    }
  };
};
export const PageAnimationMixin = dedupingMixin(PageAnimation);
