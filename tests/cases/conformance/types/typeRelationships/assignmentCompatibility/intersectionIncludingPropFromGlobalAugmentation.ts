// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54345

interface Test1 { toString: null | 'string'; }
type Test2 = Test1 & { optional?: unknown };
declare const source: Test1;
const target: Test2 = { ...source };
