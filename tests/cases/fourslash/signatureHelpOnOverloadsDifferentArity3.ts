/// <reference path='fourslash.ts'/>

////declare function f();
////declare function f(s: string);
////declare function f(s: string, b: boolean);
////declare function f(n: number, b: boolean);
////
////f(/**/

goTo.marker();
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(): any");
verify.currentSignatureParamterCountIs(0);

edit.insert(", ");
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(s: string, b: boolean): any");
verify.currentSignatureParamterCountIs(2);
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: boolean");

// What should the intended behavior be if there are too many arguments?
edit.insert(", ");
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(): any");
verify.currentSignatureParamterCountIs(0);