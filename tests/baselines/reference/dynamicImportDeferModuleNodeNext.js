//// [tests/cases/conformance/importDefer/dynamicImportDeferModuleNodeNext.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import.defer("./a.js").then(ns => {
  ns.foo();
});

import("./a.js"); // TODO: Removing this makes the `import.defer` call complain about module not found


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    console.log("foo from a");
}
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import.defer("./a.js").then(ns => {
    ns.foo();
});
import("./a.js"); // TODO: Removing this makes the `import.defer` call complain about module not found
