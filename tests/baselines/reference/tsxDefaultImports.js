//// [tests/cases/compiler/tsxDefaultImports.ts] ////

//// [a.ts]
enum SomeEnum {
  one,
}
export default class SomeClass {
  public static E = SomeEnum;
}

//// [b.ts]
import {default as Def} from "./a"
let a = Def.E.one;


//// [a.js]
var SomeEnum;
(function (SomeEnum) {
    SomeEnum[SomeEnum["one"] = 0] = "one";
})(SomeEnum || (SomeEnum = {}));
class SomeClass {
}
SomeClass.E = SomeEnum;
export default SomeClass;
//// [b.js]
import { default as Def } from "./a";
let a = Def.E.one;
