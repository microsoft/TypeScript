// @strict: true
// @declaration: true

type T10 = string[];
type T11 = Array<string>;
type T12 = readonly string[];
type T13 = ReadonlyArray<string>;

type T20 = [number, number];
type T21 = readonly [number, number];

type T30 = readonly string;  // Error
type T31<T> = readonly T;  // Error
type T32 = readonly readonly string[];  // Error
type T33 = readonly Array<string>;  // Error

function f1(ma: string[], ra: readonly string[], mt: [string, string], rt: readonly [string, string]) {
    ma = ra;  // Error
    ma = mt;
    ma = rt;  // Error
    ra = ma;
    ra = mt;
    ra = rt;
    mt = ma;  // Error
    mt = ra;  // Error
    mt = rt;  // Error
    rt = ma;  // Error
    rt = ra;  // Error
    rt = mt;
}

declare var v: readonly[number, number, ...number[]];
v[0] = 1;        // Error
v[1] = 1;        // Error
v[2] = 1;        // Error
delete v[2];     // Error
v[0 + 1] = 1;    // Error
v[0 + 2] = 1;    // Error
delete v[0 + 1]; // Error
