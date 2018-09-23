//// [strictModeEnumMemberNameReserved.ts]
"use strict";
enum E {
    static
}

const x1: E.static = E.static;


//// [strictModeEnumMemberNameReserved.js]
"use strict";
var E = E || (E = {});
(function (E) {
    E[E["static"] = 0] = "static";
})(E);
var x1 = E.static;
