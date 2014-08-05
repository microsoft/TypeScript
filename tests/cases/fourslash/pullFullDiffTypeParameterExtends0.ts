/// <reference path="fourslash.ts" />

//// class A<T, U extends T> { }
//// class B<T extends Object, U extends T> {
////     data: A<Object, Object>;
//// }
//// 
//// // Below 2 should compile without error 
//// var x: A< { }, { b: number }>;
//// var y: B< { a: string }, { }>;
//// 
//// 
//// // Below should be in error
//// var x1: A<{ a: string;}>;
//// var x2: A<{ a: number }>;
//// var x3: B<{ a: string;}, { b: string }>;
//// var x4: B<{ a: string;}>;
//// var x5: A<{ a: string; b: number }, { a: string }>;
//// var x6: B<>;
//// 
//// interface I1 {
////     a: string;
//// }
//// var x8: B<I2, I1>;
//// 

edit.disableFormatting();
diagnostics.validateTypesAtPositions(34);

