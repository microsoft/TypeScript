/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string;
//// }
//// 
//// function Foo (a: () => A) { a(); }
//// Foo(() => {  
////     { bar: '123'; }
//// })

verify.codeFix({
    description: "Add a return statement",
    index: 0,
    newFileContent: 
`interface A {
    bar: string;
}

function Foo (a: () => A) { a(); }
Foo(() => {  
    return { bar: '123' };
})`
})
