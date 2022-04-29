// @strict: true
// @module: esnext
// @moduleResolution: node
// @target: es2018
// @filename: global.d.ts
declare global {
    const React: typeof import("./module");
}
export {};

// @filename: module.d.ts
export as namespace React;
export function foo(): string;

// @filename: some_module.ts
export {}
React.foo;

// @filename: emits.ts
console.log("hello");
React.foo;
