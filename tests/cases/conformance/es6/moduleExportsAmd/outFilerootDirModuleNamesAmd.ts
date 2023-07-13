// @target: ES6
// @module: amd
// @rootDir: src
// @outFile: output.js
// @filename: src/a.ts
import foo from "./b";
export default class Foo {}
foo();

// @filename: src/b.ts
import Foo from "./a";
export default function foo() { new Foo(); }

// https://github.com/microsoft/TypeScript/issues/37429
import("./a");