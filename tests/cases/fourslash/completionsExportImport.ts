/// <reference path="fourslash.ts" />

////declare global {
////    namespace N {
////        const foo: number;
////    }
////}
////export import foo = N.foo;
/////**/

verify.completions({
    marker: "",
    exact: completion.globalsPlus([
        { name: "foo", kind: "alias", kindModifiers: "export,declare", text: "(alias) const foo: number\nimport foo = N.foo" },
        { name: "N", kind: "module", kindModifiers: "declare", text: "namespace N" },
    ]),
});
