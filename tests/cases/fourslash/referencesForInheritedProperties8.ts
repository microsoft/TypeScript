/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     [|{| "isDefinition": true |}propD|]: number;
//// }
//// interface D extends C {
////     [|{| "isDefinition": true |}propD|]: string;
////     [|{| "isDefinition": true |}propC|]: number;
//// }
//// var d: D;
//// d.[|propD|];
//// d.[|propC|];

const [d0, d1, c0, d2, c1] = test.ranges();
verify.referenceGroups([d0, d1, d2], [
    { definition: "(property) C.propD: number", ranges: [d0] },
    { definition: "(property) D.propD: string", ranges: [d1, d2] },
]);
verify.singleReferenceGroup("(property) D.propC: number", [c0, c1]);
