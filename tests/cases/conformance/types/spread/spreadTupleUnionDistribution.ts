// @strict: true
// @declaration: true

// Repro from #62812
// Spread operator fails to distribute over union when recursive type call is inlined instead of aliased

type CrossProduct<Union, Counter extends unknown[]> =
    Counter extends [infer Zero, ...infer Rest]
    ? (Union extends infer Member
        ? [Member, ...CrossProduct<Union, Rest>]
        : never)
    : [];

// Basic test - this works
let test1: CrossProduct<number | string, [undefined]>;  // [string] | [number]
type Depth1 = CrossProduct<number | string, [undefined]> // [string] | [number]

// With alias - this should work and give full cross product
let test2: (number | string extends infer Union ? (Union extends unknown ? [Union, ...Depth1]: never) : never);
// Expected: [string, string] | [number, number] | [string, number] | [number, string]

// With inlined type - this should also work but currently doesn't distribute properly
let test3: (number | string extends infer Union ? (Union extends unknown ? [Union, ...CrossProduct<number | string, [undefined]>]: never) : never);
// Expected: [string, string] | [number, number] | [string, number] | [number, string]
// Actual (bug): [string, string] | [number, number]

// With literal union - this works
let test4: (number | string extends infer Union ? (Union extends unknown ? [Union, ...([string] | [number])]: never) : never);
// Expected: [string, string] | [number, number] | [string, number] | [number, string]

// Test that the types are actually correct by checking assignability
type Expected = [string, string] | [number, number] | [string, number] | [number, string];

// These should all be true (no error)
type Test1Check = Expected extends typeof test2 ? true : false;
type Test2Check = typeof test2 extends Expected ? true : false;

// If the bug is fixed, these will also be true (no error)
type Test3Check = Expected extends typeof test3 ? true : false;
type Test4Check = typeof test3 extends Expected ? true : false;

type Test5Check = Expected extends typeof test4 ? true : false;
type Test6Check = typeof test4 extends Expected ? true : false;

// Force an error if checks fail
const _check1: Test1Check = true;
const _check2: Test2Check = true;
const _check3: Test3Check = true;  // This will error if bug exists
const _check4: Test4Check = true;  // This will error if bug exists
const _check5: Test5Check = true;
const _check6: Test6Check = true;
