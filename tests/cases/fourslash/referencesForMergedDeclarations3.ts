/// <reference path='fourslash.ts'/>

// class and uninstantiated module

////class [|{| "isWriteAccess": true, "isDefinition": true |}testClass|] {
////    static staticMethod() { }
////    method() { }
////}
////
////module [|{| "isWriteAccess": true, "isDefinition": true |}testClass|] {
////    export interface Bar {
////
////    }
////}
////
////var c1: [|testClass|];
////var c2: [|testClass|].Bar;
////[|testClass|].staticMethod();
////[|testClass|].prototype.method();
////[|testClass|].bind(this);
////new [|testClass|]();

const [class0, module0, class1, module1, class2, class3, class4, class5] = test.ranges();
verify.singleReferenceGroup("class testClass\nnamespace testClass", [module0, module1]);
const classes = [class0, class1, class2, class3, class4, class5];
verify.referenceGroups(classes, [{ definition: "class testClass\nnamespace testClass", ranges: classes }]);
