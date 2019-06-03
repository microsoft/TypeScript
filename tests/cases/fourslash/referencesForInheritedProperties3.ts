/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|[|{| "isDefinition": true, "declarationRangeIndex": 0 |}doStuff|](): void;|]
////    [|[|{| "isDefinition": true, "declarationRangeIndex": 2 |}propName|]: string;|]
//// }
////
//// var v: interface1;
//// v.[|propName|];
//// v.[|doStuff|]();

const ranges = test.rangesByText();
verify.singleReferenceGroup("(method) interface1.doStuff(): void", ranges.get("doStuff"));
verify.singleReferenceGroup("(property) interface1.propName: string", ranges.get("propName"));
