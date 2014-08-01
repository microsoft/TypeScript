///<reference path="fourslash.ts"/>

////module InternalModule/*1*/
////{
////}
////interface MyInterface/*2*/
////{
////}
////enum E/*3*/
////{
////}
////class MyClass/*4*/
////{
////constructor()/*cons*/
////{ }
////        public MyFunction()/*5*/
////        {
////                return 0;
////        }
////public get Getter()/*6*/
////{
////}
////public set Setter(x)/*7*/
////{
////}
////}
////function foo()/*8*/
////{
////{}/*9*/
////}
////(function()/*10*/
////{
////});
////(() =>/*11*/
////{
////});
////var x :/*12*/
////{};/*13*/

format.document();
goTo.marker('1');
verify.currentLineContentIs("module InternalModule {");
goTo.marker('2');
verify.currentLineContentIs("interface MyInterface {");
goTo.marker('3');
verify.currentLineContentIs("enum E {");
goTo.marker('4');
verify.currentLineContentIs("class MyClass {");
goTo.marker('cons');
verify.currentLineContentIs("    constructor()");
goTo.marker('5');
verify.currentLineContentIs("    public MyFunction() {");
goTo.marker('6');
verify.currentLineContentIs("    public get Getter() {");
goTo.marker('7');
verify.currentLineContentIs("    public set Setter(x) {");
goTo.marker('8');
verify.currentLineContentIs("function foo() {");
goTo.marker('9');
verify.currentLineContentIs("    { }");
goTo.marker('10');
verify.currentLineContentIs("(function() {");
goTo.marker('11');
verify.currentLineContentIs("(() => {");
goTo.marker('12');
verify.currentLineContentIs("var x:");
goTo.marker('13');
verify.currentLineContentIs("    {};");