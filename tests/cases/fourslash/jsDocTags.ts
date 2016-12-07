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
//// }
//// var foo = new /*1*/Foo(4);
//// /*2*/Foo./*3*/method1();
//// foo./*4*/method2();
//// foo./*5*/method3();
//// foo./*6*/method4();
//// foo./*7*/property1;
//// foo./*8*/property2;
//// foo./*9*/method5();

goTo.marker("1");
verify.baselineQuickInfo();
goTo.marker("2");
verify.baselineQuickInfo();
goTo.marker("3");
verify.baselineQuickInfo();
goTo.marker("4");
verify.baselineQuickInfo();
goTo.marker("5");
verify.baselineQuickInfo();
goTo.marker("6");
verify.baselineQuickInfo();
goTo.marker("7");
verify.baselineQuickInfo();
goTo.marker("8");
verify.baselineQuickInfo();
goTo.marker("9");
verify.baselineQuickInfo();

// /** 
//  * @param foo
//  * Does 
//  * stuff!
//  * @returns void
//  */
// function example(foo) {

// }

// example("asdf");