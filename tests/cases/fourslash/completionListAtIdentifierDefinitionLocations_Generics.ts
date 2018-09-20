/// <reference path='fourslash.ts' />

////interface A</*genericName1*/

////class A</*genericName2*/

////class B<T, /*genericName3*/

////class A{
////     f</*genericName4*/

////function A</*genericName5*/

goTo.eachMarker(() => verify.completionListIsEmpty());
