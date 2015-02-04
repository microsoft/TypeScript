/// <reference path='fourslash.ts' />

//// var x = a/*var1*/

//// var x = (b/*var2*/

//// var x = (c, d/*var3*/

//// var y : any = "", x = a/*var4*/

//// var y : any = "", x = (a/*var5*/
                                   
test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListAllowsNewIdentifier();
});


