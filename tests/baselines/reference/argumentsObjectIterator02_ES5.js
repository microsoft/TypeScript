//// [argumentsObjectIterator02_ES5.ts]

function doubleAndReturnAsArray(x: number, y: number, z: number): [number, number, number] {
    let blah = arguments[Symbol.iterator];

    let result = [];
    for (let arg of blah()) {
        result.push(arg + arg);
    }
    return <[any, any, any]>result;
}



//// [argumentsObjectIterator02_ES5.js]
var __values = (this && this.__values) || function (o) {
    var i = o.__iterator__ || 0, d;
    return i ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } };
};
var __step = (this && this.__step) || function (r) {
    return !(r.done || (r.done = (r.result = r.iterator.next()).done));
};
var __close = (this && this.__close) || function (r) {
    var m = !(r && r.done) && r.iterator["return"];
    if (m) return m.call(r.iterator);
};
function doubleAndReturnAsArray(x, y, z) {
    var blah = arguments[Symbol.iterator];
    var result = [];
    try {
        for (var iterator_1 = { iterator: __values(blah()) }; __step(iterator_1);) {
            var arg = iterator_1.result.value;
            result.push(arg + arg);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
    }
    return result;
    var e_1;
}
