//// [alwaysStrict.ts]
function f() {
    var arguments = [];
}

//// [alwaysStrict.js]
"use strict";
function f() {
    var arguments = [];
}
