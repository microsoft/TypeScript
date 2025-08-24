/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

//// export function f() {
////     const o = /** before */ { /* inline post-{ */ // end line post-{
////       // document first type
////       /* inline before */ x /* inline pre-colon */ : /* inline pre-type */ 5 /* inline post-type */ , // after comma1
////       // document second type
////       /** 2 before */ y : 'str' /** 2 after */, //after comma2
////       // pre-closing
////     } /** after */;
////     return o;
//// }

verify.codeFix({
    description: `Add return type '{ /* inline post-{ */ // end line post-{
x: number; // after comma1
y: string; }'`,
    index: 0,
    newFileContent:
`export function f(): {
    x: number;
    y: string;
} {
    const o = /** before */ { /* inline post-{ */ // end line post-{
      // document first type
      /* inline before */ x /* inline pre-colon */ : /* inline pre-type */ 5 /* inline post-type */ , // after comma1
      // document second type
      /** 2 before */ y : 'str' /** 2 after */, //after comma2
      // pre-closing
    } /** after */;
    return o;
}`,
});


