/// <reference path='fourslash.ts' />

/////*1*/function (@foo a: any, @bar b: any) { }
/////*2*/class Test { constructor(@foo props: any, @bar b: any) { } }

format.document();

goTo.marker('1');
verify.currentLineContentIs('function (@foo a: any, @bar b: any) { }');

goTo.marker('2');
verify.currentLineContentIs('class Test { constructor(@foo props: any, @bar b: any) { } }');