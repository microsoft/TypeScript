// @target: esnext
// @noEmit: true

// overload resolution
declare function f1(array: TemplateStringsArrayOf<readonly ["a", ...string[]]>, ...args: any): "A";
declare function f1(array: TemplateStringsArrayOf<readonly ["b", ...string[]]>, ...args: any): "B";
declare function f1(array: TemplateStringsArray, ...args: any): "C";
const f1_r0 = f1`a`;        // "A"
const f1_r1 = f1`a${"b"}`;  // "A"
const f1_r2 = f1`b`;        // "B"
const f1_r3 = f1`b${"b"}`;  // "B"
const f1_r4 = f1`c`;        // "C"
const f1_r5 = f1`c${"b"}`;  // "C"

// constrained type parameter
declare function f0<T extends TemplateStringsArray, A extends string[]>(array: T, ...args: A): [T, A];
const f0_r0 = f0`a${"b"}c`; // [TemplateStringsArrayOf<readonly ["a", "c"], readonly ["a", "c"]>, ["b"]]

// interpolation example
type TemplatePrimitive = string | number | bigint | boolean | null | undefined;

type Interpolate<T extends readonly string[], A extends any[], R extends string = ''> =
    T extends readonly [infer TH extends string, ...infer TT extends readonly string[]] ?
        A extends [infer AH extends TemplatePrimitive, ...infer AT extends TemplatePrimitive[]] ?
            Interpolate<TT, AT, `${R}${TH}${AH}`> :
            Interpolate<TT, [], `${R}${TH}`> :
        R;

// string interpolation
declare function interp<T extends TemplateStringsArray, A extends TemplatePrimitive[]>(array: T, ...args: A): Interpolate<T, A>;
const interp_r0 = interp`a${"b"}c`;    // "abc"
const interp_r1 = interp`a${1}c`;      // "a1c"

// "a\nb\nc"
const interp_r2 = interp`a\n${"b"}
c`; 

// raw string interpolation (i.e., 'String.raw')
declare function raw<T extends TemplateStringsArray, A extends TemplatePrimitive[]>(array: T, ...args: A): Interpolate<T["raw"], A>;
const raw_r0 = raw`a${"b"}c`;          // "abc"
const raw_r1 = raw`a${1}c`;            // "a1c"

// "a\\nb\nc"
const raw_r2 = raw`a\n${"b"}
c`;
