//// [tests/cases/compiler/constEnumNamespaceReferenceCausesNoImport2.ts] ////

//// [index.ts]
import Foo = require("./reexport");
function check(x: Foo.ConstFooEnum): void {
  switch (x) {
    case Foo.ConstFooEnum.Some:
      break;
  }
}
//// [foo.ts]
export module ConstEnumOnlyModule {
  export const enum ConstFooEnum {
    Some,
    Values,
    Here
  }
}

//// [reexport.ts]
import * as Foo from "./foo";
export = Foo.ConstEnumOnlyModule;


/// [Declarations] ////



//// [/.src/foo.d.ts]
export declare namespace ConstEnumOnlyModule {
    const enum ConstFooEnum {
        Some = 0,
        Values = 1,
        Here = 2
    }
}

//// [/.src/index.d.ts]
export {};

//// [/.src/reexport.d.ts]
import * as Foo from "./foo";
declare const _default: typeof Foo.ConstEnumOnlyModule;
export = _default;
