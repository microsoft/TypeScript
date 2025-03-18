//// [tests/cases/conformance/expressions/typeGuards/TypeGuardWithEnumUnion.ts] ////

//// [TypeGuardWithEnumUnion.ts]
enum Color { R, G, B }

function f1(x: Color | string) {
    if (typeof x === "number") {
        var y = x;
        var y: Color;
    }
    else {
        var z = x;
        var z: string;
    }
}

function f2(x: Color | string | string[]) {
    if (typeof x === "object") {
        var y = x;
        var y: string[];
    }
    if (typeof x === "number") {
        var z = x;
        var z: Color;
    }
    else {
        var w = x;
        var w: string | string[];
    }
    if (typeof x === "string") {
        var a = x;
        var a: string;
    }
    else {
        var b = x;
        var b: Color | string[];
    }
}


//// [TypeGuardWithEnumUnion.js]
var Color;
(function (Color) {
    Color[Color["R"] = 0] = "R";
    Color[Color["G"] = 1] = "G";
    Color[Color["B"] = 2] = "B";
})(Color || (Color = {}));
function f1(x) {
    if (typeof x === "number") {
        var y = x;
        var y;
    }
    else {
        var z = x;
        var z;
    }
}
function f2(x) {
    if (typeof x === "object") {
        var y = x;
        var y;
    }
    if (typeof x === "number") {
        var z = x;
        var z;
    }
    else {
        var w = x;
        var w;
    }
    if (typeof x === "string") {
        var a = x;
        var a;
    }
    else {
        var b = x;
        var b;
    }
}
