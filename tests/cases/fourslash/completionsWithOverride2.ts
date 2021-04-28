/// <reference path='fourslash.ts'/>

//// interface I {
////     baz () {}
//// }
//// class A {
////     foo () {} 
////     bar () {}
//// }
//// class B extends A implements I {
////     override /*1*/
//// }

verify.completions({
    marker: "1",
    includes: [
        "foo",
        "bar"
    ],
    excludes: [
        "baz"
    ],
    isNewIdentifierLocation: true
})
