// @declaration: true
import { Record } from "./a";
export type Foo<K extends string> = Record<K, number>;

export const obj = {
  doThing<K extends string>(_k: K): Foo<K> {
    return {} as any;
  },
};