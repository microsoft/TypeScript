//// [typeGuardsTypeParameters.ts]
// Type guards involving type parameters produce intersection types

class C {
    prop: string;
}

function f1<T>(x: T) {
    if (x instanceof C) {
        let v1: T = x;
        let v2: C = x;
        x.prop;
    }
}

function f2<T>(x: T) {
    if (typeof x === "string") {
        let v1: T = x;
        let v2: string = x;
        x.length;
    }
}

// Repro from #13872

function fun<T>(item: { [P in keyof T]: T[P] }) {
    const strings: string[] = [];
    for (const key in item) {
        const value = item[key];
        if (typeof value === "string") {
            strings.push(value);
        }
    }
}


//// [typeGuardsTypeParameters.js]
// Type guards involving type parameters produce intersection types
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
function f1(x) {
    if (x instanceof C) {
        var v1 = x;
        var v2 = x;
        x.prop;
    }
}
function f2(x) {
    if (typeof x === "string") {
        var v1 = x;
        var v2 = x;
        x.length;
    }
}
// Repro from #13872
function fun(item) {
    var strings = [];
    for (var key in item) {
        var value = item[key];
        if (typeof value === "string") {
            strings.push(value);
        }
    }
}
