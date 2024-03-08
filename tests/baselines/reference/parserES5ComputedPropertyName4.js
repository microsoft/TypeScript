//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName4.ts] ////

//// [parserES5ComputedPropertyName4.ts]
var v = { get [e]() { } };

//// [parserES5ComputedPropertyName4.js]
var _a;
var v = (_a = {}, Object.defineProperty(_a, e, {
    get: function () { },
    enumerable: false,
    configurable: true
}), _a);
