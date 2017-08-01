/// <reference path='fourslash.ts'/>

////interface T { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: number; }
////type U = { readonly [K in keyof T]?: string };
////declare const t: T;
////t.[|a|];
////declare const u: U;
////u.[|a|];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r1], [{ definition: "(property) T.a: number", ranges }]);
verify.referenceGroups(r2, [
    { definition: "(property) T.a: number", ranges: [r0, r1] },
    { definition: "(property) a: string", ranges: [r2] }]);
