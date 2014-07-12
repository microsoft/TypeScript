//// [file2.ts]
import f = require('file1');
f.foo();


//// [file1.js]
function foo() {
    var classes = undefined;
    return new classes(null);
}
exports.foo = foo;
//// [file2.js]
var f = require('file1');
f.foo();


////[file1.d.ts]
export declare function foo(): any;
////[file2.d.ts]
