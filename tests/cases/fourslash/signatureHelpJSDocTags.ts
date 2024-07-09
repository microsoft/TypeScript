///<reference path="fourslash.ts" />

//// /**
////  * This is class Foo.
////  * @mytag comment1 comment2
////  */
//// class Foo {
////     /**
////      * This is the constructor.
////      * @myjsdoctag this is a comment
////      */
////     constructor(value: number) {}
////     /**
////      * method1 documentation
////      * @mytag comment1 comment2
////      */
////     static method1() {}
////     /**
////      * @mytag
////      */
////     method2() {}
////     /**
////      * @mytag comment1 comment2
////      */
////     property1: string;
////     /**
////      * @mytag1 some comments
////      * some more comments about mytag1
////      * @mytag2
////      * here all the comments are on a new line
////      * @mytag3
////      * @mytag
////      */
////     property2: number;
////     /**
////      * @returns {number} a value
////      */
////     method3(): number { return 3; }
////     /**
////      * @param {string} foo A value.
////      * @returns {number} Another value
////      * @mytag
////      */
////     method4(foo: string): number { return 3; }
////     /** @mytag */
////     method5() {}
////     /** method documentation
////      *  @mytag a JSDoc tag
////      */
////     newMethod() {}
//// }
//// var foo = new Foo(/*10*/4);
//// Foo.method1(/*11*/);
//// foo.method2(/*12*/);
//// foo.method3(/*13*/);
//// foo.method4();
//// foo.property1;
//// foo.property2;
//// foo.method5();
//// foo.newMet

verify.baselineSignatureHelp()
