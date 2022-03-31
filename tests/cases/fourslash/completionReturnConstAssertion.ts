/// <reference path="fourslash.ts" />


//// type T = {
////     foo1: 1;
////     foo2: 2;
//// }
//// function F(x: ()=>T) {}
//// F(()=>({/*1*/} as const))

verify.completions({
    marker: "1",
    exact: [
        { name: "foo1", text: "(property) T.foo1: 1" },
        { name: "foo2", text: "(property) T.foo2: 2" },
    ],
});
