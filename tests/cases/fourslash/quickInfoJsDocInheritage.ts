/// <reference path='fourslash.ts' />

//// interface A {
////     /**
////      * @description A.foo1
////      */
////     foo1: number;
////     /**
////      * @description A.foo2
////      */
////     foo2: (para1: string) => number;
//// }
//// 
//// interface B {
////     /**
////      * @description B.foo1
////      */
////     foo1: number;
////     /**
////      * @description B.foo2
////      */
////     foo2: (para2: string) => number;
//// }
//// 
//// // implement multi interfaces with duplicate name
//// // method for function signature
//// class C implements A, B {
////     /*1*/foo1: number = 1;
////     /*2*/foo2(q: string) { return 1 }
//// }
//// 
//// // implement multi interfaces with duplicate name
//// // property for function signature
//// class D implements A, B {
////     /*3*/foo1: number = 1;
////     /*4*/foo2 = (q: string) => { return 1 }
//// }
//// 
//// new C()./*5*/foo1;
//// new C()./*6*/foo2;
//// new D()./*7*/foo1;
//// new D()./*8*/foo2;
//// 
//// class Base1 {
////     /**
////      * @description Base1.foo1 
////      */
////     foo1: number = 1;
//// 
////     /**
////      * 
////      * @param q Base1.foo2 parameter
////      * @returns Base1.foo2 return
////      */
////      foo2(q: string) { return 1 }
//// }
//// 
//// // extends class and implement interfaces with duplicate name
//// // property override method
//// class Drived1 extends Base1 implements A {
////     /*9*/foo1: number = 1;
////     /*10*/foo2(para1: string) { return 1 };
//// }
//// 
//// // extends class and implement interfaces with duplicate name
//// // method override method
//// class Drived2 extends Base1 implements B {
////     /*11*/foo1: number = 1;
////     /*12*/foo2 = (para1: string) => { return 1; };
//// }
//// 
//// class Base2 {
////     /**
////      * @description Base2.foo1 
////      */
////     foo1: number = 1;
////     /**
////      * 
////      * @param q Base2.foo2 parameter
////      * @returns Base2.foo2 return
////      */
////     foo2(q: string) { return 1 }
//// }
//// 
//// // extends class and implement interfaces with duplicate name
//// // property override method
//// class Drived3 extends Base2 implements A {
////     /*13*/foo1: number = 1;
////     /*14*/foo2(para1: string) { return 1 };
//// }
//// 
//// // extends class and implement interfaces with duplicate name
//// // method override method
//// class Drived4 extends Base2 implements B {
////     /*15*/foo1: number = 1;
////     /*16*/foo2 = (para1: string) => { return 1; };
//// }
//// 
//// new Drived1()./*17*/foo1;
//// new Drived1()./*18*/foo2;
//// new Drived2()./*19*/foo1;
//// new Drived2()./*20*/foo2;
//// new Drived3()./*21*/foo1;
//// new Drived3()./*22*/foo2;
//// new Drived4()./*23*/foo1;
//// new Drived4()./*24*/foo2;

verify.baselineQuickInfo();
