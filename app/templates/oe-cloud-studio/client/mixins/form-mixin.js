import {
  dedupingMixin
} from '@polymer/polymer/lib/utils/mixin.js';
import {
  OEFormMessagesMixin
} from 'oe-mixins/form-mixins/oe-form-messages-mixin';
import {
  OEFormValidationMixin
} from 'oe-mixins/form-mixins/oe-form-validation-mixin';
import {
  OEModelHandler
} from 'oe-mixins/form-mixins/oe-model-handler';

import {
  OEAjaxMixin
} from 'oe-mixins/oe-ajax-mixin.js';
/** @polymerMixin */

const F_Form = BaseClass => class extends OEFormMessagesMixin(OEModelHandler(OEFormValidationMixin(OEAjaxMixin(BaseClass)))) {
  /**
   * @polymer
   * @mixinClass
   */

  connectedCallback() {
    super.connectedCallback();

    this.disableAutoFetch = false;

    //this.addEventListener('oe-formdata-inserted', this._onInsertOrUpdate);
    //this.addEventListener('oe-formdata-updated', this._onInsertOrUpdate);

    // this.addEventListener('oe-formdata-loaded', this._onDataLoaded);
    // this.addEventListener('oe-formdata-initialised', this._onDataLoaded);

    this.use('preInsert', this._beforeSave);
    this.use('preUpdate', this._beforeSave);
    this.use('preDelete', this._beforeSave);
    this.use('postChange', this._postChangeField)
    this._defaultVMInitialised = false;
    this._fetchDefault();
  }


  _beforeSave(headers, model, next) {
    return next();
  }

  _postChangeField(fieldId, value, model, next){
    /* Start Spinner */
    this._crossFieldCalculate(fieldId, value, model, function(fieldId, value, model){
      /* Stop Spinner */
      next(fieldId, value, model);
    });
  }

  /**
   * Overridable post-change-field for performing cross-field calculations
   * @param {*} fieldId 
   * @param {*} value 
   * @param {*} model 
   * @param {*} cb 
   */
  _crossFieldCalculate(fieldId, value, model, cb){
    cb(fieldId, value, model);
  }

  // _onInsertOrUpdate({
  //   type,
  //   detail: {
  //     data: model
  //   }
  // }) {
  //   const pathNameToRedirect = window.location.pathname.replace(/\w+$/, model.fbo_number);
  //   oe_navigate_to(pathNameToRedirect, {
  //     [this.modelAlias]: model
  //   });
  // }

  // _onDataLoaded({
  //   type,
  //   detail: {
  //     data: model
  //   }

  // }) {
  //   console.log(`_onDataLoaded: ${type}: `, model);
  // }

  // modelIdChanged(evt) {
  //   // eslint-disable-line no-unused-vars
  //   evt = null;

  //   if (!this.disableAutoFetch && this.resturl && this.modelId) {
  //     if (this.modelId !== 'new' && this.modelId !== -1) {
  //       this._doFetch();
  //     } else {
  //       this.doClear();
  //     }
  //   }
  // }
  static get properties() {
    return {
      defaultArgs: Object
    }
  }

  get model() {
    return this[this.modelAlias];
  }
  /**
   * Alias for doClear. Can be removed, once various calls are updated to doClear.
   */
  handleNew() {
    this.doClear();
  }

  /**
   * doCopy override for fetching 'copy' from server.
   */
  doCopy() {
    if (this.resturl && this.modelId !== 'new') {
      this.makeAjaxCall(`${this.resturl}/duplicate/${this.modelId}`, 'GET', null, null, null, (err, res) => {
        if (err) {
          return this.fire('oe-show-error', OEUtils.extractErrorMessage(err));
        }
        oe_navigate_to(window.location.pathname.replace(/\d+$/, 'new'), {
          [this.modelAlias]: res
        });
      });
    } else {
      super.doCopy();
    }
  }

  /**
   * Fetches initial default values for view-model.
   */
  _fetchDefault() {
    if(!this.resturl){
        return;
    }
    this.makeAjaxCall(this.resturl + '/default', 'GET', null, null, this.defaultArgs, this.queryString, (err, res) => {
      if (err) {
        return this.fire('oe-show-error', OEUtils.extractErrorMessage(err));
      }

      const newModel = Object.assign({}, this.defaultVM, res);
      this.set('defaultVM', newModel);
      this._defaultVMInitialised = true;
      if (this.modelId === 'new' && !this.disableAutoFetch)
        this.doClear();
    });
  }

  __isEmpty(value) {
      switch(typeof value) {
          case 'undefined': return true;
          case 'number': return false;
          case 'string': return value.trim().length === 0;
          default: return !value;
      }
  }

};

export const FormMixin = dedupingMixin(F_Form);