/// <reference path="fourslash.ts" />

//// enum A {
////     f = 'f'
//// }

//// enum B {
////     ...A,
////     b = 'b'
//// }

//// B./*1*/

verify.completions({
    marker: '1',
    includes: [
        "f"
    ]
})
