//// [declarationTypeParameterConstraint.ts] ////
import { type In, type Out, type Base } from "./a";

export const object = {
  doThing<T extends Base>(_t: T, _in: In[T]): Out[T] {
    return;
  },
};
//// [declarationTypeParameterConstraint.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
exports.object = {
    doThing: function (_t, _in) {
        return;
    },
};
