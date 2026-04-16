// @strict: true

// Repro from #52912

type Source1 = { array: Source2[] };
type Source2 = { array: Source3[] };
type Source3 = { array: Source4[] };
type Source4 = {};

type Target1 = { array: Target2[] };
type Target2 = { array: Target3[] };
type Target3 = { array: Target4[] };
type Target4 = { someNewProperty: string };

declare const source1: Source1;
declare const source2: Source2;
declare const source3: Source3;
declare const source4: Source4;

const target1: Target1 = source1; // Error
const target2: Target2 = source2; // Error
const target3: Target3 = source3; // Error
const target4: Target4 = source4; // Error
