import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";
import {PolymerRedux} from "./polymer-redux.js";

import {store} from '../scripts/state/store.js';

const reduxMixin = PolymerRedux(store);

export const ReduxMixin = dedupingMixin(reduxMixin);
