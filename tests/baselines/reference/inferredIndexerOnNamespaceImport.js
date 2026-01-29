//// [tests/cases/compiler/inferredIndexerOnNamespaceImport.ts] ////

//// [foo.ts]
export const x = 3;
export const y = 5;

//// [bar.ts]
import * as foo from "./foo";

function f(map: { [k: string]: number }) {
  // ...
}

f(foo);

//// [foo.js]
export const x = 3;
export const y = 5;
//// [bar.js]
import * as foo from "./foo";
function f(map) {
    // ...
}
f(foo);
