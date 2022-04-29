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
////  props: CustomElements[T];
////}
////
////declare function create<T extends keyof CustomElements>(name: T, options: Options<T>): void;
////
////create('component-one', { props: { /*1*/ } });
////create('component-two', { props: { /*2*/ } });

verify.completions({
  marker: "1",
  exact: [{
    name: "foo",
    sortText: completion.SortText.OptionalMember
  }]
});

verify.completions({
  marker: "2",
  exact: [{
    name: "bar",
    sortText: completion.SortText.OptionalMember
  }]
});
