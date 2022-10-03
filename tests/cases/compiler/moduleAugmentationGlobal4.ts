// @module: commonjs
// @declaration: true

// @filename: f1.ts
declare global {
    interface Something {x}
}
export {};
// @filename: f2.ts

declare global {
    interface Something {y}
}
export {};
// @filename: f3.ts
import "./f1";
import "./f2";

