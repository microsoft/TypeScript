//// [tests/cases/compiler/typeAliasExport.ts] ////

//// [typeAliasExport.ts]
declare module "a" {
  export default undefined
  export var a;
  export type a = typeof a;
}

//// [typeAliasExport.js]
