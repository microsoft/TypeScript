// @declaration: true
import { type In, type Out, type Base } from "./a";

export const object = {
  doThing<T extends Base>(_t: T, _in: In[T]): Out[T] {
    return;
  },
};