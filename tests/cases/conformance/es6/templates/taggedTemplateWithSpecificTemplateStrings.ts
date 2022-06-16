// @target: esnext
// @noEmit: true
// @strict: true

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

// Jest's `it.each`:
type Whitespace = " " | "\t" | "\v"

type Trim<S extends string, Chars extends string = Whitespace | "\n"> =
    S extends `${Chars}${infer R}` ? Trim<R, Chars> :
    S extends `${infer R}${Chars}` ? Trim<R, Chars> :
    S;

type Split<S extends string, D extends string> =
    S extends D ? [] :
    S extends `${infer H}${D}${infer T}` ? [H, ...Split<T, D>] :
    [S];

type ParseRows<A extends any[], S extends readonly string[], Row extends any[] = [], Rows extends any[][] = []> =
    [A, S] extends [[infer AH, ...infer AT], readonly [infer TH extends string, ...infer TT extends string[]]] ?
        Trim<TH, Whitespace> extends "|" ? ParseRows<AT, TT, [...Row, AH], Rows> :
        Trim<TH, Whitespace> extends "\n" | "" ? ParseRows<AT, TT, [], [...Rows, [...Row, AH]]> :
        never :
    [A, S] extends [[], readonly []] ? Rows :
    never;

type JestEachArgument<Headers extends string[], Rows extends any[][]> = {
    [P1 in keyof Rows]: {
        [P2 in keyof Headers as P2 extends `${number}` ? Trim<Headers[P2]> : never]:
            P2 extends keyof Rows[P1] ? Rows[P1][P2] : undefined;
    };
}[number];

type JestEachFunction<Arg> = (name: string, cb: (arg: Arg) => void, timeout?: number) => void;

type JestEach<T extends readonly string[], A extends any[]> =
    T extends readonly [infer TH extends string, ...infer TT extends readonly string[]] ?
        JestEachFunction<JestEachArgument<Split<Trim<TH>, "|">, ParseRows<A, TT>>> :
        null;

declare function each<T extends readonly string[], A extends unknown[]>(strs: T, ...args: A): JestEach<T, A>;

each`
    foo    | bar
    ${"a"} | ${1}
    ${"c"} | ${undefined}
`("test", ({ foo, bar }) => {
    foo;
    bar;
});
