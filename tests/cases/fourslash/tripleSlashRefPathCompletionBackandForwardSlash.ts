/// <reference path='fourslash.ts' />

// Exercises completions for hidden files (ie: those beginning with '.')

// @Filename: f.ts
//// /*f1*/
// @Filename: d1/g.ts
//// /*g1*/
// @Filename: d1/d2/h.ts
//// /*h1*/
// @Filename: d1/d2/d3/i.ts
//// /// <reference path=".\..\..\/*28*/

// @Filename: test.ts
//// /// <reference path="/*0*/
//// /// <reference path=".//*1*/
//// /// <reference path=".\/*2*/
//// /// <reference path="./*3*/

//// /// <reference path="d1//*4*/
//// /// <reference path="d1/.//*5*/
//// /// <reference path="d1/.\/*6*/
//// /// <reference path="d1/./*7*/

//// /// <reference path="d1\/*8*/
//// /// <reference path="d1\.//*9*/
//// /// <reference path="d1\.\/*10*/
//// /// <reference path="d1\./*11*/

//// /// <reference path="d1/d2//*12*/
//// /// <reference path="d1/d2/.//*13*/
//// /// <reference path="d1/d2/.\/*14*/
//// /// <reference path="d1/d2/./*15*/

//// /// <reference path="d1/d2\/*16*/
//// /// <reference path="d1/d2\.//*17*/
//// /// <reference path="d1/d2\.\/*18*/
//// /// <reference path="d1/d2\./*19*/

//// /// <reference path="d1\d2//*20*/
//// /// <reference path="d1\d2/.//*21*/
//// /// <reference path="d1\d2/.\/*22*/
//// /// <reference path="d1\d2/./*23*/

//// /// <reference path="d1\d2\/*24*/
//// /// <reference path="d1\d2\.//*25*/
//// /// <reference path="d1\d2\.\/*26*/
//// /// <reference path="d1\d2\./*27*/

testBlock(0,  'f.ts', "d1");
testBlock(4,  'g.ts', "d2");
testBlock(8,  'g.ts', "d2");
testBlock(12, 'h.ts', "d3");
testBlock(16, 'h.ts', "d3");
testBlock(20, 'h.ts', "d3");
testBlock(24, 'h.ts', "d3");

goTo.marker("28");
verify.completionListContains("g.ts");
verify.completionListContains("d2");
verify.not.completionListItemsCountIsGreaterThan(2);

function testBlock(offset: number, fileName: string, dir: string) {
    for (let m = offset; m < offset + 4; ++m) {
        goTo.marker("" + m);
        verify.completionListContains(fileName);
        verify.completionListContains(dir);
        verify.not.completionListItemsCountIsGreaterThan(2);
    }
}
