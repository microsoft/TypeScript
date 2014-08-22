//@module: commonjs
// @Filename: chainedImportAlias_file0.ts
export module m {
    export function foo() { }
}

// @Filename: chainedImportAlias_file1.ts 
import x = require('chainedImportAlias_file1');
import y = x;
declare var console: {
    log(message?: any);
};
console.log(y);
