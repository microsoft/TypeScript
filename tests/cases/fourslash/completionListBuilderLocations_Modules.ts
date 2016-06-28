/// <reference path='fourslash.ts' />

////module A/*moduleName1*/


////module A./*moduleName2*/

goTo.marker("moduleName1");
verify.not.completionListIsEmpty();

goTo.marker("moduleName2");
verify.completionListIsEmpty();
