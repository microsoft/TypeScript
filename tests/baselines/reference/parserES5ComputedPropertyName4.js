//// [parserES5ComputedPropertyName4.ts]
var v = { get [e]() { } };

//// [parserES5ComputedPropertyName4.js]
var _a;
var v = (_a = {}, Object.defineProperty(_a, e, {
    get: function () { },
    enumerable: true,
    configurable: true
}), _a);
