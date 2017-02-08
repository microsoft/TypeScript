/// <reference path='fourslash.ts'/>

////interface A1 { [|a|]: string };
////interface A2 { [|a|]?: number };
////interface A3 { [|a|]?: boolean };
////let a123: spread(spread(A1, A2), A3);
////a123.[|a|];
const ranges = test.ranges();

// members of spread types only refer to themselves and the resulting property
verifyReferencesOfIndices(ranges, 0, [0, 3]);
verifyReferencesOfIndices(ranges, 1, [1, 3]);
verifyReferencesOfIndices(ranges, 2, [2, 3]);
// but the resulting property refers to everything
verifyReferencesOfIndices(ranges, 3, [0, 1, 2, 3]);

function verifyReferencesOfIndices(ranges: FourSlashInterface.Range[], source: number, ns: number[]) {
    verify.referencesOf(ranges[source], ns.map(n => ranges[n]));
}
