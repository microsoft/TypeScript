//// [nullishCoalescingOperatorInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
(({ [a() ?? "d"]: c = "" }) => {})();

//// [nullishCoalescingOperatorInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
((_a) => { var _b; var { [(_b = a()) !== null && _b !== void 0 ? _b : "d"]: c = "" } = _a; })();
