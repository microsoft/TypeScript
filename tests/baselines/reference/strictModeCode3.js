//// [strictModeCode3.ts]
"use strict"
interface public { }
interface implements {
    foo(package, protected);
}
enum package { }

//// [strictModeCode3.js]
"use strict";
var package;
(function (package) {
})(package || (package = {}));
