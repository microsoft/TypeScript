// @strict: true
// @module: esnext
// @moduleResolution: node
// @target: es2018
// @filename: global.d.ts
declare global {
    const React: typeof import("./module");
}

export { };

// @filename: module.d.ts
export = React;
export as namespace React;

declare namespace React {
    function createRef(): any;
}

// @filename: some_module.ts
export { };
React.createRef;

// @filename: emits.ts
console.log("hello");
React.createRef;