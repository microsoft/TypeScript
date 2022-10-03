//// [indirectGlobalSymbolPartOfObjectType.ts]
export { }
const Symbol = globalThis.Symbol;
[][Symbol.iterator];

//// [indirectGlobalSymbolPartOfObjectType.js]
const Symbol = globalThis.Symbol;
[][Symbol.iterator];
export {};
