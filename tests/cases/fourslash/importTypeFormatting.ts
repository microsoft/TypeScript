/// <reference path="fourslash.ts"/>

////var y: import("./c2").mytype;
////var z: import ("./c2").mytype;

format.document();
verify.currentFileContentIs(
`var y: import("./c2").mytype;
var z: import("./c2").mytype;`);
