//// [constEnumErrors.ts]
const enum E {
    A
}

module E {
    var x = 1;
}

const enum E1 {
    // illegal case
    // forward reference to the element of the same enum
    X = Y, 
    // forward reference to the element of the same enum
    Y = E1.Z,
    Y1 = E1["Z"]
}

const enum E2 {
    A
}

var y0 = E2[1]
var name = "A";
var y1 = E2[name];

var x = E2;
var y = [E2];

function foo(t: any): void {
}

foo(E2);

//// [constEnumErrors.js]
var E;
(function (E) {
    var x = 1;
})(E || (E = {}));
var y0 = E2[1];
var name = "A";
var y1 = E2[name];
var x = E2;
var y = [E2];
function foo(t) {
}
foo(E2);
