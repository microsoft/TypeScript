/// <reference path="fourslash.ts" />

//// type Base = {
////   [K in "foo" | "bar"]: K;
//// };
////
//// class Cls implements Base { /*1*/ }

verify.completions({
  marker: "1",
  includes: ["foo", "bar"],
  isNewIdentifierLocation: true,
});

verify.completions({
  marker: "1",
  includes: [
    {
      name: "foo",
      insertText: `foo: "foo";`,
      filterText: "foo",
    },
    {
      name: "bar",
      insertText: `bar: "bar";`,
      filterText: "bar",
    },
  ],
  isNewIdentifierLocation: true,
  preferences: {
    includeCompletionsWithClassMemberSnippets: true,
    includeCompletionsWithInsertText: true,
  },
});
