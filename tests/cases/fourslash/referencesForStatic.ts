/// <reference path='fourslash.ts'/>

// Reference a class static.

// @Filename: referencesOnStatic_1.ts
////var n = 43;
////
////class foo {
////    static [|{| "isWriteAccess": true, "isDefinition": true |}n|] = '';
////
////    public bar() {
////        foo.[|n|] = "'";
////        if(foo.[|n|]) {
////            var x = foo.[|n|];
////        }
////    }
////}
////
////class foo2 {
////    private x = foo.[|n|];
////    constructor() {
////        foo.[|n|] = x;
////    }
////
////    function b(n) {
////        n = foo.[|n|];
////    }
////}

// @Filename: referencesOnStatic_2.ts
////var q = foo.[|n|];

verify.singleReferenceGroup("(property) foo.n: string");
