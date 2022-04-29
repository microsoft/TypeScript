/// <reference path='fourslash.ts' />

// @strict: true

//// abstract class A { abstract a (); }
//// 
//// class AT extends A { a () {} }
//// 
//// class T {
////     a: AT;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `abstract class A { abstract a (); }

class AT extends A { a () {} }

class T {
    a: AT = new AT;
}`,
    index: 2
})