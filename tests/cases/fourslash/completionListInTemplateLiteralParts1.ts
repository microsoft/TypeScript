/// <reference path="fourslash.ts" />

/////*0*/`  $ { ${/*1*/ 10/*2*/ + 1.1/*3*/ /*4*/} 12312`/*5*/
////
/////*6*/`asdasd${/*7*/ 2 + 1.1 /*8*/} 12312 {

test.markers().forEach(marker => {
    goTo.position(marker.position);

    verify.completionListItemsCountIsGreaterThan(0)
});