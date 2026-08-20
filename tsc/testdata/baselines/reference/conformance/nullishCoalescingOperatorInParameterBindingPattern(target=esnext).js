//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperatorInParameterBindingPattern.ts] ////

//// [nullishCoalescingOperatorInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
(({ [a() ?? "d"]: c = "" }) => {})();

//// [nullishCoalescingOperatorInParameterBindingPattern.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
(({ [a() ?? "d"]: c = "" }) => { })();
