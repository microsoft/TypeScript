//// [unusedLocalsAndObjectSpread.ts]
declare var console: { log(a: any): void };

function one() {
    const foo = { a: 1, b: 2 };
    // 'a' is declared but never used
    const {a, ...bar} = foo;
    console.log(bar);
}

function two() {
    const foo = { a: 1, b: 2 };
    // '_' is declared but never used
    const {a: _, ...bar} = foo;
    console.log(bar);
}

function three() {
    const foo = { a: 1, b: 2 };
    // 'a' is declared but never used
    const {a, ...bar} = foo; // bar should be unused
    //console.log(bar);
}

function four() {
    const foo = { a: 1, b: 2 };
    // '_' is declared but never used
    const {a: _, ...bar} = foo; // bar should be unused
    //console.log(bar);
}


//// [unusedLocalsAndObjectSpread.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function one() {
    var foo = { a: 1, b: 2 };
    // 'a' is declared but never used
    var a = foo.a, bar = __rest(foo, ["a"]);
    console.log(bar);
}
function two() {
    var foo = { a: 1, b: 2 };
    // '_' is declared but never used
    var _ = foo.a, bar = __rest(foo, ["a"]);
    console.log(bar);
}
function three() {
    var foo = { a: 1, b: 2 };
    // 'a' is declared but never used
    var a = foo.a, bar = __rest(foo, ["a"]); // bar should be unused
    //console.log(bar);
}
function four() {
    var foo = { a: 1, b: 2 };
    // '_' is declared but never used
    var _ = foo.a, bar = __rest(foo, ["a"]); // bar should be unused
    //console.log(bar);
}
