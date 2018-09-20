/// <reference path='fourslash.ts'/>

////function foo(x: string) {
////    return /*1*/arguments;
////}

verify.quickInfoAt("1", "(local var) arguments: IArguments");
