// @preserveConstEnums: true
// @noTypesAndSymbols: true

// @filename: foo.ts
export module ConstEnumOnlyModule {
  export const enum ConstFooEnum {
    Some,
    Values,
    Here
  }
}

// @filename: reexport.ts
import * as Foo from "./foo";
export = Foo.ConstEnumOnlyModule;

// @filename: index.ts
import Foo = require("./reexport");
function check(x: Foo.ConstFooEnum): void {
  switch (x) {
    case Foo.ConstFooEnum.Some:
      break;
  }
}