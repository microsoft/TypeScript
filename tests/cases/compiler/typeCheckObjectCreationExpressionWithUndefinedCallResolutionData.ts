// @module: commonjs
// @declaration: true
// @Filename: file1.ts
export function foo() {
var classes = undefined;
    return new classes(null);
}

// @Filename: file2.ts
import f = require('./file1');
f.foo();
