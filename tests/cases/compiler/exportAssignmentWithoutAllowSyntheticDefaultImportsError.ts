// @target: es2015
// @module: es2015

// @Filename: /bar.ts
export = bar;
function bar() {}

// @Filename: /foo.ts
import bar from './bar';