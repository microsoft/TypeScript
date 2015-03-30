//// [symbolProperty19.ts]
var i = {
    [Symbol.iterator]: { p: null },
    [Symbol.toStringTag]() { return { p: undefined }; }
}

var it = i[Symbol.iterator];
var str = i[Symbol.toStringTag]();

//// [symbolProperty19.js]
var i = {
    [Symbol.iterator]: { p: null },
    [Symbol.toStringTag]() { return { p: undefined }; }
};
var it = i[Symbol.iterator];
var str = i[Symbol.toStringTag]();
