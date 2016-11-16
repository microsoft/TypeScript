//// [ES5for-of32.ts]

var array = [1,2,3];
var sum = 0;

for (let num of array) {
    if (sum === 0) {
        array = [4,5,6]
    }
    
    sum += num;
}

//// [ES5for-of32.js]
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var array = [1, 2, 3];
var sum = 0;
try {
    for (var array_1 = { iterator: __values(array) }; __step(array_1);) {
        var num = array_1.result.value;
        if (sum === 0) {
            array = [4, 5, 6];
        }
        sum += num;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(array_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;
