//// [tests/cases/compiler/declarationEmitJsReExportDefault.ts] ////

//// [package.json]
{"name": "a", "version": "0.0.0"}
//// [index.d.ts]
export const a = 123;

//// [index.mjs]
export {default as mod} from 'a';




//// [index.d.mts]
export { default as mod } from "a";
