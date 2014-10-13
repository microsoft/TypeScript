/// <reference path='fourslash.ts'/>

////function foo(x: string) {
////    return /*1*/arguments;
////}

goTo.marker('1');
debugger;
verify.quickInfoIs('(local var) arguments: IArguments');