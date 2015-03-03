/// <reference path="fourslash.ts"/>

////var x = /*1*/"asd
/////*2*/var y = 2;
verify.errorExistsAfterMarker("1");
verify.not.errorExistsAfterMarker("2");
verify.numberOfErrorsInCurrentFile(1);




