//// [symbolProperty18.ts]
var i = {
    [Symbol.iterator]: 0,
    [Symbol.toStringTag]() { return "" },
    set [Symbol.toPrimitive](p: boolean) { }
}

var it = i[Symbol.iterator];
var str = i[Symbol.toStringTag]();
i[Symbol.toPrimitive] = false;

//// [symbolProperty18.js]
var i = {
    [Symbol.iterator]: 0,
    [Symbol.toStringTag]() { return ""; },
    set [Symbol.toPrimitive](p) { }
};
var it = i[Symbol.iterator];
var str = i[Symbol.toStringTag]();
i[Symbol.toPrimitive] = false;
