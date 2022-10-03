/// <reference path="fourslash.ts"/>
//// var fn = (x: string) => ()=> alert(x)/**/

goTo.marker();
edit.insert(";");
verify.currentLineContentIs("var fn = (x: string) => () => alert(x);"); // Space added after '()'
