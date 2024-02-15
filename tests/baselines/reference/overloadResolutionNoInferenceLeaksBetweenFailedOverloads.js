//// [tests/cases/compiler/overloadResolutionNoInferenceLeaksBetweenFailedOverloads.ts] ////

//// [49820.ts]
type A1<T> = { type: "a1", v: T };
type B1<T> = { type: "b1", v: T };
type A2 = { a2: string };
type B2 = { b2: string };

function fn<T>(p1: (pp1: 0) => A1<T>, p2: (pp2: A2) => 0): void;
function fn<T>(p1: (pp1: 0) => B1<T>, p2: (pp2: B2) => 0): void;
function fn<T>(
  p1:
    | ((pp1: 0) => A1<T>)
    | ((pp1: 0) => B1<T>),
  p2:
    | ((pp2: A2) => 0)
    | ((pp2: B2) => 0)
) {}

const valA1: A1<string> = ({ type: "a1", v: "" });
const valB1: B1<string> = ({ type: "b1", v: "" });

// expect A
fn((ap1) => valA1, (ap2) => 0);
fn((ap1) => valA1, (ap2: A2) => 0); 
fn((ap1) => valA1, (ap2: any) => 0);
fn((ap1) => valA1, (ap2: unknown) => 0);
fn((ap1: 0) => valA1, (ap2) => 0);
// expect B
fn((bp1) => valB1, (bp2) => 0); // but it will be A, only this will result in an error
fn((bp1) => valB1, (bp2: B2) => 0); 
fn((bp1) => valB1, (bp2: any) => 0);
fn((bp1) => valB1, (bp2: unknown) => 0);
fn((bp1: 0) => valB1, (bp2) => 0);
//// [13430.ts]
declare function it(f: () => void): number;
declare function it(f: (x: string) => void): string;

let r = it((x) => {x});
//// [21525.ts]
interface TestFunction {
    <T>(input: { [key: number]: T }, callback: (value: T, key: number, collection: { [key: number]: T }) => boolean): boolean;
    <T extends object>(input: T, callback: (value: T[keyof T], key: string, collection: T) => boolean): boolean;
}

const fn: TestFunction = {} as any;
fn({ a: "a", b: "b" }, (value, key) => true);


//// [49820.js]
function fn(p1, p2) { }
const valA1 = ({ type: "a1", v: "" });
const valB1 = ({ type: "b1", v: "" });
// expect A
fn((ap1) => valA1, (ap2) => 0);
fn((ap1) => valA1, (ap2) => 0);
fn((ap1) => valA1, (ap2) => 0);
fn((ap1) => valA1, (ap2) => 0);
fn((ap1) => valA1, (ap2) => 0);
// expect B
fn((bp1) => valB1, (bp2) => 0); // but it will be A, only this will result in an error
fn((bp1) => valB1, (bp2) => 0);
fn((bp1) => valB1, (bp2) => 0);
fn((bp1) => valB1, (bp2) => 0);
fn((bp1) => valB1, (bp2) => 0);
export {};
//// [13430.js]
let r = it((x) => { x; });
export {};
//// [21525.js]
const fn = {};
fn({ a: "a", b: "b" }, (value, key) => true);
export {};
