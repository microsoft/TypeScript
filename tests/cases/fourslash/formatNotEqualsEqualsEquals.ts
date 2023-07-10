/// <reference path="fourslash.ts"/>

////const x =       1      !===    2;

format.document();
verify.currentFileContentIs(`const x = 1 !=== 2;`);
