/// <reference path="fourslash.ts" />

////interface CustomElements {
////  'component-one': {
////      foo?: string;
////  },
////  'component-two': {
////      bar?: string;
////  }
////}
////
////interface Options<T extends keyof CustomElements> {
////    props?: {} & { x: CustomElements[(T extends string ? T : never) & string][] }['x'];
////}
////
////declare function f<T extends keyof CustomElements>(k: T, options: Options<T>): void;
////
////f("component-one", {
////    props: [{
////        /**/
////    }]
////})

verify.completions({
  marker: "",
  exact: [{
    name: "foo",
    sortText: completion.SortText.OptionalMember
  }]
});
