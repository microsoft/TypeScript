//// [optionalChainingInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): { d: string } | undefined => undefined;
(({ [a()?.d]: c = "" }) => {})();

//// [optionalChainingInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
((_a) => { var _b; var { [(_b = a()) === null || _b === void 0 ? void 0 : _b.d]: c = "" } = _a; })();
