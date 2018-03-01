/// <reference path='fourslash.ts' />

// @strict: true

//// class TT { }
//// 
//// class T {
////     a: TT;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class TT { }

class T {
    a: TT = new TT;
}`,
    index: 2
})