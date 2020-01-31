/// <reference path="fourslash.ts" />

// @Filename: component.tsx

////interface CustomElements {
////  'component-one': {
////      foo?: string;
////  },
////  'component-two': {
////      bar?: string;
////  }
////}
////
////type Options<T extends keyof CustomElements> = { kind: T } & Required<{ x: CustomElements[(T extends string ? T : never) & string] }['x']>;
////
////declare function Component<T extends keyof CustomElements>(props: Options<T>): void;
////
////const c = <Component /**/ kind="component-one" />

verify.completions({
  marker: "",
  exact: [{
    name: "foo"
  }]
})
