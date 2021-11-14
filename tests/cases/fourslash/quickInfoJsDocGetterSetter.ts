/// <reference path='fourslash.ts' />

//// class A {
////     /**
////      * getter A
////      * @returns return A
////      */
////     get /*1*/x(): string {
////         return "";
////     }
////     /**
////      * setter A
////      * @param value foo A
////      * @todo empty jsdoc
////      */
////     set /*2*/x(value) { }
//// }
//// // override both getter and setter
//// class B extends A {
////     /**
////      * getter B
////      * @returns return B
////      */
////     get /*3*/x(): string {
////         return "";
////     }
////     /**
////      * setter B
////      * @param value foo B
////      */
////     set /*4*/x(vale) { }
//// }
//// // not override
//// class C extends A { }
//// // only override setter
//// class D extends A {
////     /**
////      * setter D
////      * @param value foo D
////      */
////     set /*5*/x(val: string) { }
//// }
//// new A()./*6*/x = "1";
//// new B()./*7*/x = "1";
//// new C()./*8*/x = "1";
//// new D()./*9*/x = "1";

verify.quickInfoAt("1", "(getter) A.x", 'getter A', [{ name: "returns", text: "return A" }]);
verify.quickInfoAt("2", "(setter) A.x", 'setter A', [{ name: "param", text: "value foo A" }, { name: "todo", text: "empty jsdoc" }]);
verify.quickInfoAt("3", "(getter) B.x", 'getter B', [{ name: "returns", text: "return B" }]);
verify.quickInfoAt("4", "(setter) B.x", 'setter B', [{ name: "param", text: "value foo B" }]);
verify.quickInfoAt("5", "(setter) D.x", 'setter D', [{ name: "param", text: "value foo D" }]);

verify.quickInfoAt("6", "(property) A.x: string", 'getter A\nsetter A', [
    { name: "returns", text: "return A" },
    { name: "param", text: "value foo A" },
    { name: "todo", text: "empty jsdoc" },
]);
verify.quickInfoAt("7", "(property) B.x: string", 'getter B\nsetter B', [
    { name: "returns", text: "return B" },
    { name: "param", text: "value foo B" },
]);
verify.quickInfoAt("8", "(property) A.x: string", 'getter A\nsetter A', [
    { name: "returns", text: "return A" },
    { name: "param", text: "value foo A" },
    { name: "todo", text: "empty jsdoc" },
]);
verify.quickInfoAt("9", "(property) D.x: string", 'setter D', [{ name: "param", text: "value foo D" }]);
