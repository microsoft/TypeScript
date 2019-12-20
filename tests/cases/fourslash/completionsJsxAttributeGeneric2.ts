/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: index.tsx
////declare namespace JSX {
////  interface Element {}
////  interface IntrinsicElements {}
////  interface ElementAttributesProperty { props }
////}
////
////type Props = { a?: string, b?: string };
////function Component<T extends Props>(props: T) { return null; }
////const e1 = <Component /*1*/ />;
////const e2 = <Component /*2*/></Component>
////
////declare class Component2<T extends Props> {
////  props: T;
////}
////const e3 = <Component2 /*3*/ />;
////const e4 = <Component2 /*4*/></Component2>;

["1", "2", "3", "4"].forEach(marker => {
  verify.completions({
    marker,
    exact: [{
      name: "a",
      sortText: completion.SortText.OptionalMember
    }, {
      name: "b",
      sortText: completion.SortText.OptionalMember
    }]
  });
});
