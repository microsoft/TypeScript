//// [chainedImportAlias_file1.ts]
import x = require('chainedImportAlias_file1');
import y = x;
declare var console: {
    log(message?: any);
};
console.log(y);


//// [chainedImportAlias_file1.js]
var x = require('chainedImportAlias_file1');
var y = x;

console.log(y);
