/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|{| "isDefinition": true |}doStuff|](): void;
////    [|{| "isDefinition": true |}propName|]: string;
//// }
//// interface interface2 extends interface1 {
////    [|{| "isDefinition": true |}doStuff|](): void;
////    [|{| "isDefinition": true |}propName|]: string;
//// }
////
//// var v: interface1;
//// v.[|propName|];
//// v.[|doStuff|]();

const ranges = test.rangesByText();
const methods = ranges.get("doStuff");
const [m0, m1, m2] = methods;
verify.referenceGroups(methods, [
    { definition: "(method) interface1.doStuff(): void", ranges: [m0, m2] },
    { definition: "(method) interface2.doStuff(): void", ranges: [m1] }
]);

const props = ranges.get("propName");
const [p0, p1, p2] = props;
verify.referenceGroups(props, [
    { definition: "(property) interface1.propName: string", ranges: [p0, p2] },
    { definition: "(property) interface2.propName: string", ranges: [p1] }
]);
