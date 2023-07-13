//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperatorInParameterInitializer.ts] ////

//// [nullishCoalescingOperatorInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
((b = a() ?? "d") => {})();

//// [nullishCoalescingOperatorInParameterInitializer.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
((b) => { var _a; if (b === void 0) { b = (_a = a()) !== null && _a !== void 0 ? _a : "d"; } })();
