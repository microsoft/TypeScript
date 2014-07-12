/// <reference path='fourslash.ts' />


//// class C<T, U extends T> {  // it is error to reference T in constraint
////     constructor() { }
////     foo(a: T) {
////     }
//// }
//// 
//// interface I1 {
////     a: string;/*1*/
//// };
//// 
//// interface I2 {
////     a: number;
////     b: string;
//// }
//// 
//// var x = new C< { a: number; }, { a: number; b: string; }>();
//// var y = new C<I1, I2>();
//// var z = new C<I2, I1>()
//// /*2*/

goTo.marker("2");
edit.insertLine("");
// y fails due to a: string in I1, z fails due to I1 not being assignment compatible to I2
verify.numberOfErrorsInCurrentFile(3);

goTo.marker("1");
edit.backspace(10);
edit.insertLine("");
verify.numberOfErrorsInCurrentFile(2);
// y should be OK now member a is gone, z fails due to I1 not being assignment compatible to I2

edit.insert("a: number;");
// y should be OK with member a the correct type, z still fails due to I1 not being assignment compatible to I2
verify.numberOfErrorsInCurrentFile(2);
