/// <reference path="fourslash.ts"/>

////x => x;
////(y) => y;
/////**/
////(y) => y;
////x => x;

verify.numberOfErrorsInCurrentFile(0);
verify.not.errorExistsBeforeMarker();
verify.not.errorExistsAfterMarker();