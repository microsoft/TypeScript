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
    exact: [
        { name: "foo", kind: "alias", kindModifiers: "export,declare", text: "(alias) const foo: number\nimport foo = N.foo" },
        ...completion.globalsPlus([{ name: "N", kind: "module", kindModifiers: "declare", text: "namespace N" }]),
    ],
});
