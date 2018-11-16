/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     [|{| "isDefinition": true |}prop0|]: string;  // r0
////     [|{| "isDefinition": true |}prop1|]: number;  // r1
//// }
////
//// interface D extends C {
////     [|{| "isDefinition": true |}prop0|]: string;  // r2
//// }
////
//// var d: D;
//// d.[|prop0|];  // r3
//// d.[|prop1|];  // r4

const [r0, r1, r2, r3, r4] = test.ranges();
verify.referenceGroups([r0, r2, r3], [
    { definition: "(property) C.prop0: string", ranges: [r0] },
    { definition: "(property) D.prop0: string", ranges: [r2, r3] }
]);
verify.singleReferenceGroup("(property) C.prop1: number", [r1]);
verify.noReferences(r4);
