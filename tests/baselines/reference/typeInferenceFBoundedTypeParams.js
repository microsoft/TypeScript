//// [typeInferenceFBoundedTypeParams.ts]
// Example from #6037

function fold<a, r>(values: a[], result: r, fold: (result: r, value: a) => r): r {
    for (let value of values) {
        result = fold(result, value);
    }
    return result;
}

function append<a, b extends a>(values: a[], value: b): a[] {
    values.push(value);
    return values;
}

fold(
    [1, 2, 3],
    [] as [string, string][],
    (result, value) => append(
        result,
        ["", ""]
    )
);


//// [typeInferenceFBoundedTypeParams.js]
// Example from #6037
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
function fold(values, result, fold) {
    try {
        for (var values_1 = { iterator: __values(values) }; __step(values_1);) {
            var value = values_1.result.value;
            result = fold(result, value);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { __close(values_1); } finally { if (e_1) throw e_1.error; }
    }
    return result;
    var e_1;
}
function append(values, value) {
    values.push(value);
    return values;
}
fold([1, 2, 3], [], function (result, value) { return append(result, ["", ""]); });
