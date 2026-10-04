//// [tests/cases/compiler/umdGlobalAugmentationNoCrash.ts] ////

//// [global.d.ts]
declare global {
    const React: typeof import("./module");
}
export {};

//// [module.d.ts]
export as namespace React;
export function foo(): string;

//// [some_module.ts]
export {}
React.foo;

//// [emits.ts]
console.log("hello");
React.foo;


//// [some_module.js]
React.foo;
export {};
//// [emits.js]
"use strict";
console.log("hello");
React.foo;
