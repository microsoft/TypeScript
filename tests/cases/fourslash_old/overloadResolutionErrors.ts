/// <reference path="fourslash.ts"/>

// Tests that the error spans are correct for a signature mismatch

/////*1*/'foo'.replace('o', '3')./*2*/replace/*3*/('f', 5)/*4*/;
////
/////*5*/('foo'.replace('o', '3')./*55*/replace/*6*/)/*65*/('f', 5);
////var foo = { 
////    fun: () => false,
////    fun2: function () { return true; }
////};
/////*7*/foo./*8*/fun/*9*/(1);
/////*10*/foo./*11*/fun2/*12*/(1);
////
////module M {
////   export class C {
////       constructor(x: number) { }
////       public method(x: string);
////       public method(x: number);
////       public method(x) { }
////   }
////}
////var c: M.C = new /*13*/M./*14*/C/*15*/("");
/////*16*/c./*17*/method/*18*/(c);
/////*19*/(c./*195*/method/*20*/)/*21*/(c);


verify.errorExistsBetweenMarkers('2', '3');
verify.errorExistsBetweenMarkers('8', '9');
verify.errorExistsBetweenMarkers('11', '12');
verify.errorExistsBetweenMarkers('14', '15');
verify.errorExistsBetweenMarkers('17', '18');
verify.not.errorExistsBetweenMarkers('1', '2');
verify.not.errorExistsBetweenMarkers('3', '4');
verify.not.errorExistsBetweenMarkers('7', '8');
verify.not.errorExistsBetweenMarkers('10', '11');
verify.not.errorExistsBetweenMarkers('13', '14');
verify.not.errorExistsBetweenMarkers('16', '17');
