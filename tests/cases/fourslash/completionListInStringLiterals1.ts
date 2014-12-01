/// <reference path="fourslash.ts" />

////"/*1*/       /*2*/\/*3*/
//// /*4*/   \\/*5*/

test.markers().forEach(marker => {
    goTo.position(marker.position);

    verify.completionListIsEmpty()
});