//// [optionalChainingInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): { d: string } | undefined => undefined;
((b = a()?.d) => {})();

//// [optionalChainingInParameterInitializer.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
((b) => { var _a; if (b === void 0) { b = (_a = a()) === null || _a === void 0 ? void 0 : _a.d; } })();
