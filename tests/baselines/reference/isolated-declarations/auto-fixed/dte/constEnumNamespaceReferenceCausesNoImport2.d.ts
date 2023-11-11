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
declare const _default: invalid;
export = _default;
/// [Errors] ////

reexport.ts(2,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== index.ts (0 errors) ====
    import Foo = require("./reexport");
    function check(x: Foo.ConstFooEnum): void {
      switch (x) {
        case Foo.ConstFooEnum.Some:
          break;
      }
    }
==== foo.ts (0 errors) ====
    export module ConstEnumOnlyModule {
      export const enum ConstFooEnum {
        Some,
        Values,
        Here
      }
    }
    
==== reexport.ts (1 errors) ====
    import * as Foo from "./foo";
    export = Foo.ConstEnumOnlyModule;
             ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    