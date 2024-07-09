//// [tests/cases/conformance/expressions/optionalChaining/optionalChainingInParameterBindingPattern.ts] ////

//// [optionalChainingInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): { d: string } | undefined => undefined;
(({ [a()?.d]: c = "" }) => {})();

//// [optionalChainingInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
(({ [a()?.d]: c = "" }) => { })();
