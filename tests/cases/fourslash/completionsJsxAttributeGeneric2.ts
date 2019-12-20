/// <reference path="fourslash.ts" />

// @jsx: react

// @Filename: index.tsx
////type Props = { a?: string, b?: string };
////function Component<T extends Props>(props: T) { return null; }
////const element = <Component /**/ />

verify.completions({
  marker: "",
  exact: [{
    name: "a",
    sortText: completion.SortText.OptionalMember
  }, {
    name: "b",
    sortText: completion.SortText.OptionalMember
  }]
});
