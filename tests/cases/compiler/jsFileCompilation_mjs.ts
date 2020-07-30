// @allowJs: true
// @checkJs: true
// @noEmit: true
// @target: es6
// @filename: a.mjs
// `.mjs` files are automatically external modules, and thus in strict mode

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

// @filename: b.mjs
class c {
    a(eval) { //error
    }
    method() {
        var let = 10; // error
    }
}

// @filename: c.mjs
var let = 10;
var eval = function () {
};

//@filename: d.mjs
var x = 009; // error
