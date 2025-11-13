//// [tests/cases/compiler/constEnumNamespaceReferenceCausesNoImport.ts] ////

//// [foo.ts]
export const enum ConstFooEnum {
    Some,
    Values,
    Here
};
export function fooFunc(): void { /* removed */ }
//// [index.ts]
import * as Foo from "./foo";

function check(x: Foo.ConstFooEnum): void {
  switch (x) {
    case Foo.ConstFooEnum.Some:
      break;
  }
}

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fooFunc = fooFunc;
;
function fooFunc() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function check(x) {
    switch (x) {
        case 0 /* Foo.ConstFooEnum.Some */:
            break;
    }
}
