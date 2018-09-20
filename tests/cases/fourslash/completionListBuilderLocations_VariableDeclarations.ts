/// <reference path='fourslash.ts' />

////var x = a/*var1*/

////var x = (b/*var2*/

////var x = (c, d/*var3*/

//// var y : any = "", x = a/*var4*/

//// var y : any = "", x = (a/*var5*/

////class C{}
////var y = new C(

//// class C{}
//// var y = new C(0, /*var7*/

////var y = [/*var8*/

////var y = [0, /*var9*/

////var y = `${/*var10*/

////var y = `${10} dd ${ /*var11*/

////var y = 10; y=/*var12*/

goTo.eachMarker(() => verify.completionListAllowsNewIdentifier());
