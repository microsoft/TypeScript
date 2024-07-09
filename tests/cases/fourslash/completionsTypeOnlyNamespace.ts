/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export namespace ns {
////  export class Box<T> {}
////  export type Type = {};
////  export const Value = {};
////}

// @Filename: /b.ts
////import type { ns } from './a';
////let x: ns./**/

verify.completions({
  marker: "",
  exact: [{
    name: "Box",
    text: "class ns.Box<T>",
  }, {
    name: "Type",
    text: "type ns.Type = {}"
  }]
});
