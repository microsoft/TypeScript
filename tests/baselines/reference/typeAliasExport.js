//// [typeAliasExport.ts]
declare module "a" {
  export default 0
  export var a;
  export type a = typeof a;
}

//// [typeAliasExport.js]
