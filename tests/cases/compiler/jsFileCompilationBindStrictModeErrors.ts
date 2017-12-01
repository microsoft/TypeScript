// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: a.js
// @target: es6
"use strict";
var a = {
    a: "hello", // error
    b: 10,
    a: 10 // error
};
var let = 10; // error
delete a; // error
try {
} catch (eval) { // error
}
function arguments() { // error
}

with (a) {
    b = 10;
}

// @filename: b.js
// this is not in strict mode but class definitions are always in strict mode
class c {
    a(eval) { //error
    }
    method() {
        var let = 10; // error
    }
}

// @filename: c.js
export var let = 10; // external modules are automatically in strict mode
var eval = function () {
};

//@filename: d.js
"use strict";
var x = 009; // error