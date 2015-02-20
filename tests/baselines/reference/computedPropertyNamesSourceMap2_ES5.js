//// [computedPropertyNamesSourceMap2_ES5.ts]
var v = {
    ["hello"]() {
        debugger;
    }
}

//// [computedPropertyNamesSourceMap2_ES5.js]
var v = function () {
    debugger;
}(_a = {}, _a["hello"] = , _a);
var _a;
//# sourceMappingURL=computedPropertyNamesSourceMap2_ES5.js.map