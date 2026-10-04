//// [declarationTypeParameterConstraint.ts] ////
import { type In, type Out, type Base } from "./a";

export const object = {
  doThing<T extends Base>(_t: T, _in: In[T]): Out[T] {
    return;
  },
};
//// [declarationTypeParameterConstraint.d.ts] ////
import { type In, type Out, type Base } from "./a";
export declare const object: {
    doThing<T extends Base>(_t: T, _in: In[T]): Out[T];
};
