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



//// [foo.d.ts]
export declare namespace ConstEnumOnlyModule {
    const enum ConstFooEnum {
        Some = 0,
        Values = 1,
        Here = 2
    }
}

//// [index.d.ts]
export {};

//// [reexport.d.ts]
import * as Foo from "./foo";
declare const _default: typeof Foo.ConstEnumOnlyModule;
export = _default;
