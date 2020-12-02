//// [optionalChainingInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
const a = (): { d: string } | undefined => undefined;
((b = a()?.d) => {})();

//// [optionalChainingInParameterInitializer.js]
// https://github.com/microsoft/TypeScript/issues/36295
const a = () => undefined;
((b = a()?.d) => { })();
