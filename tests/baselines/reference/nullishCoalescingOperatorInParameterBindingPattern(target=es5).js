//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperatorInParameterBindingPattern.ts] ////

//// [nullishCoalescingOperatorInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
(({ [a() ?? "d"]: c = "" }) => {})();

//// [nullishCoalescingOperatorInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
(({ [(_a = a()) !== null && _a !== void 0 ? _a : "d"]: c = "" }) => { var _a; })();
