const utils = require('../../lib/utils.js');
const log = require('oe-logger')('Skeleton-Mixin');

// var ModelDefinition;
log.info('Skeleton Mixin Loaded.');

module.exports = Model => {
  // ModelDefinition = Model;
  if ((Model.settings.overridingMixins && !Model.settings.overridingMixins.SkeletonMixin) || !Model.definition.settings.mixins.SkeletonMixin) {
    Model.evRemoveObserver('access', beforeAccess);
  } else {
    Model.evObserve('access', beforeAccess);
  }
};

function beforeAccess(ctx, next) {
  const modelSettings = ctx.Model.definition.settings;
  if (modelSettings.mixins.SkeletonMixin === false) {
    return next();
  }
  var x = utils.addNumbers(3, 4);
  if ( x !== 7 ) {
    return next(new Error('Addition not good'));
  }
  return next();
}

