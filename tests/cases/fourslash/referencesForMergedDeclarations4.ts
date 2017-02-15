/// <reference path='fourslash.ts'/>

// class and instantiated module

////class [|{| "isWriteAccess": true, "isDefinition": true |}testClass|] {
////    static staticMethod() { }
////    method() { }
////}
////
////module [|{| "isWriteAccess": true, "isDefinition": true |}testClass|] {
////    export interface Bar {
////
////    }
////    export var s = 0;
////}
////
////var c1: [|testClass|];
////var c2: [|testClass|].Bar;
////[|testClass|].staticMethod();
////[|testClass|].prototype.method();
////[|testClass|].bind(this);
////[|testClass|].s;
////new [|testClass|]();

const ranges = test.ranges();
verify.referenceGroups(ranges.slice(0, 8), [{ definition: "class testClass\nnamespace testClass", ranges }]);
verify.referenceGroups(ranges[8], [{ definition: "constructor testClass(): testClass\nnamespace testClass", ranges }]);
