//// [nullishCoalescingOperatorInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
(({ [a() ?? "d"]: c = "" }) => {})();

//// [nullishCoalescingOperatorInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
var a = function () { return undefined; };
(function (_a) {
    var _b;
    var _c = (_b = a()) !== null && _b !== void 0 ? _b : "d", _d = _a[_c], c = _d === void 0 ? "" : _d;
})();
