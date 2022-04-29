/// <reference path='fourslash.ts'/>

//// class A {
////     foo () {} 
////     bar () {}
//// }
//// class B extends A {
////     override /*1*/
//// }

verify.completions({
    marker: "1",
    includes: [
        "foo",
        "bar"
    ],
    isNewIdentifierLocation: true
})
