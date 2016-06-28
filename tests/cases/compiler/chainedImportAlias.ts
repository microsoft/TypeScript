// @module: commonjs
// @Filename: chainedImportAlias_file0.ts
export module m {
    export function foo() { }
}

// @Filename: chainedImportAlias_file1.ts 
import x = require('./chainedImportAlias_file0');
import y = x;
y.m.foo();
