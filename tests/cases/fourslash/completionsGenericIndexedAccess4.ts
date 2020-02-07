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
////declare function create<T extends 'hello' | 'goodbye'>(name: T, options: Options<T extends 'hello' ? 'component-one' : 'component-two'>): void;
////declare function create<T extends keyof CustomElements>(name: T, options: Options<T>): void;
////
////create('hello', { props: { /*1*/ } })
////create('goodbye', { props: { /*2*/ } })
////create('component-one', { props: { /*3*/ } });

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

verify.completions({
  marker: "3",
  exact: [{
    name: "foo",
    sortText: completion.SortText.OptionalMember
  }]
});
