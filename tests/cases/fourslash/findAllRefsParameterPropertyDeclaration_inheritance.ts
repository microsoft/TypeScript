/// <reference path='fourslash.ts'/>

////class C {
////	constructor(public [|{| "isWriteAccess": true, "isDefinition": true |}x|]: string) {
////		[|x|];
////	}
////}
////class D extends C {
////	constructor(public [|{| "isWriteAccess": true, "isDefinition": true |}x|]: string) {
////		super([|x|]);
////	}
////}

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "(property) C.x: string", ranges: [r0] },
    { definition: "(parameter) x: string", ranges: [r1] },
    { definition: "(property) D.x: string", ranges: [r2, r3] },
]);
verify.referenceGroups(r1, [
    { definition: "(property) C.x: string", ranges: [r0] },
    { definition: "(parameter) x: string", ranges: [r1] },
]);
verify.referenceGroups(r2, [
    { definition: "(property) C.x: string", ranges: [r0, r1] },
    { definition: "(property) D.x: string", ranges: [r2] },
    { definition: "(parameter) x: string", ranges: [r3] },
]);
verify.referenceGroups(r3, [
    { definition: "(property) D.x: string", ranges: [r2] },
    { definition: "(parameter) x: string", ranges: [r3] },
]);
