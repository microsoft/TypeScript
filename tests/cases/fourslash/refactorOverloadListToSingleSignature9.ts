/// <reference path="fourslash.ts" />

/////*a1*/function foo(a: string): void;
/////*a2*/function foo(a: number): void;/*b2*/
/////*a3*/function foo(a: number | string): void/*b3*/ /*a4*/{
////    /*a5*/console.log(1);/*b5*/
////}/*b4*//*b1*/

goTo.select("a1", "b1");
verify.refactorAvailable("Convert overload list to single signature", "Convert overload list to single signature", ts.Diagnostics.Convert_overload_list_to_single_signature.message);

goTo.select("a2", "b2");
verify.refactorAvailable("Convert overload list to single signature", "Convert overload list to single signature", ts.Diagnostics.Convert_overload_list_to_single_signature.message);

goTo.select("a3", "b3");
verify.refactorAvailable("Convert overload list to single signature", "Convert overload list to single signature", ts.Diagnostics.Convert_overload_list_to_single_signature.message);

goTo.select("a4", "b4");
verify.not.refactorAvailable("Convert overload list to single signature", "Convert overload list to single signature", ts.Diagnostics.Convert_overload_list_to_single_signature.message);

goTo.select("a5", "b5");
verify.not.refactorAvailable("Convert overload list to single signature", "Convert overload list to single signature", ts.Diagnostics.Convert_overload_list_to_single_signature.message);
