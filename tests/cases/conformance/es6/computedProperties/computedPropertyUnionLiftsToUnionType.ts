// @strict: true
// @target: es6
// @declaration: true

declare var ab: 'a' | 'b';
declare var cd: 'c' | 'd';
declare var onetwo: 1 | 2;
enum Alphabet {
    Aleph,
    Bet,
}
declare var alphabet: Alphabet;

// Basic: union literal key lifts to union of object types
const x: { a: string } | { b: string } = { [ab]: 'hi' }

// Multiple unions create cross-product
const y: { a: string, m: number, c: string }
    | { a: string, m: number, d: string }
    | { b: string, m: number, c: string }
    | { b: string, m: number, d: string } = { [ab]: 'hi', m: 1, [cd]: 'there' }

// Union + spread
const s: { a: string, c: string } | { b: string, c: string } = { [ab]: 'hi', ...{ c: 'no' }}

// Number literal union
const n: { "1": string } | { "2": string } = { [onetwo]: 'hi' }

// Enum literal union
const e: { "0": string } | { "1": string } = { [alphabet]: 'hi' }

// Soundness check: accessing non-existent property should be error
const obj = { [ab]: 1 }
// obj should be { a: number } | { b: number }, not { a: number; b: number }
// So accessing both .a and .b should require a type guard

// Methods and getters alongside union computed property
const m: { a: string, m(): number, p: number } | { b: string, m(): number, p: number } =
    { [ab]: 'hi', m() { return 1 }, get p() { return 2 } }
