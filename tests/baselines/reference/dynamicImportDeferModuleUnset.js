//// [tests/cases/conformance/importDefer/dynamicImportDeferModuleUnset.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import.defer("./a").then(ns => {
  ns.foo();
});

import("./a"); // TODO: Removing this makes the `import.defer` call complain about module not found


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
import.defer("./a").then(ns => {
    ns.foo();
});
import("./a"); // TODO: Removing this makes the `import.defer` call complain about module not found
