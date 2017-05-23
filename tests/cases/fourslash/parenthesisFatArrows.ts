/// <reference path="fourslash.ts"/>

////x => x;
////(y) => y;
/////**/
////(y) => y;
////x => x;

verify.noErrors();
verify.not.errorExistsBeforeMarker();
verify.not.errorExistsAfterMarker();