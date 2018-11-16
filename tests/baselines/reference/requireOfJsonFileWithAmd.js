//// [tests/cases/compiler/requireOfJsonFileWithAmd.ts] ////

//// [file1.ts]
import b1 = require('./b');
let x = b1.a;
import b2 = require('./b.json');
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}

//// [b.json]
{
    "a": true,
    "b": "hello"
}

//// [out/file1.js]
define(["require", "exports", "./b", "./b.json"], function (require, exports, b1, b2) {
    "use strict";
    exports.__esModule = true;
    var x = b1.a;
    if (x) {
        var b = b2.b;
        x = (b1.b === b);
    }
});
