/// <reference path='fourslash.ts'/>

////declare function fn(x: string);
////declare function fn(x: string, y: number);
////declare function fn2(x: string);
////declare function fn2(x: string, y: number);
////fn('', fn2(/*1*/

goTo.marker('1');
verify.signatureHelpCountIs(2);
verify.currentSignatureHelpIs("fn2(x: string): any");
verify.currentParameterHelpArgumentNameIs("x");
verify.currentParameterSpanIs("x: string");

edit.insert("'',");

verify.signatureHelpCountIs(2);
verify.currentSignatureHelpIs("fn2(x: string, y: number): any");
verify.currentParameterHelpArgumentNameIs("y");
verify.currentParameterSpanIs("y: number");
