//// [tests/cases/compiler/umdNamespaceMergedWithGlobalAugmentationIsNotCircular.ts] ////

//// [global.d.ts]
declare global {
    const React: typeof import("./module");
}

export { };

//// [module.d.ts]
export = React;
export as namespace React;

declare namespace React {
    function createRef(): any;
}

//// [some_module.ts]
export { };
React.createRef;

//// [emits.ts]
console.log("hello");
React.createRef;

//// [some_module.js]
React.createRef;
export {};
//// [emits.js]
"use strict";
console.log("hello");
React.createRef;
