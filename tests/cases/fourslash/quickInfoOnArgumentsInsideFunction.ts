/// <reference path='fourslash.ts'/>

////function foo(x: string) {
////    return /*1*/arguments;
////}

goTo.marker('1');
verify.quickInfoIs('(local var) arguments: IArguments');