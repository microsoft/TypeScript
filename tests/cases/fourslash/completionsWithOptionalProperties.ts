/// <reference path="fourslash.ts" />
// @strict: true

//// interface Options {
////     hello?: boolean;
////     world?: boolean;
//// }
//// declare function foo(options?: Options): void;
//// foo({
////     hello: true,
////     /**/
//// });

verify.completions({
    marker: "",
    exact: [
      { name: "world", kind: "property", kindModifiers: "optional", sortText: completion.SortText.OptionalMember }
    ]
});

