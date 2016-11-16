//// [controlFlowForOfStatement.ts]
let obj: number[];
let x: string | number | boolean | RegExp;

function a() {
    x = true;
    for (x of obj) {
        x = x.toExponential();
    }
    x; // string | boolean
}


//// [controlFlowForOfStatement.js]
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var obj;
var x;
function a() {
    x = true;
    try {
        for (var obj_1 = { iterator: __values(obj) }; __step(obj_1);) {
            x = obj_1.result.value;
            x = x.toExponential();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { __close(obj_1); } finally { if (e_1) throw e_1.error; }
    }
    x; // string | boolean
    var e_1;
}
