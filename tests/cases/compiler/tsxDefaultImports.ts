// @Filename: a.ts

enum SomeEnum {
  one,
}
export default class SomeClass {
  public static E = SomeEnum;
}

// @Filename: b.ts
import {default as Def} from "./a"
let a = Def.E.one;
