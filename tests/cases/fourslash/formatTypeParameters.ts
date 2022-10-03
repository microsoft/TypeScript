/// <reference path="fourslash.ts"/>

/////**/type Bar<T extends any[]= any[]> = T


format.document();
goTo.marker();
verify.currentLineContentIs('type Bar<T extends any[] = any[]> = T');