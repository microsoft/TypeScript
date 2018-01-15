// @noImplicitAny: true
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

const x: { a: string } | { b: string } = { [ab]: 'hi' }
//   multiple unions
const y: { a: string, m: number, c: string }
    | { a: string, m: number, d: string }
    | { b: string, m: number, c: string }
    | { b: string, m: number, d: string } = { [ab]: 'hi', m: 1, [cd]: 'there' }
//   union, spread (with union inside), union
const s: { a: string, c: string } | { b: string, c: string } = { [ab]: 'hi', ...{ c: 'no' }}
const sd: { a: string } | { b: string } = { [ab]: 'hi', ...{ a: 'no' }}
const sn: { a: string, c: string }
    | { a: string, d: string }
    | { b: string, c: string }
    | { b: string, d: string } = { [ab]: 'hi', ...{ [cd]: 'no' }}
// methods
const m: { a: string, m(): number, p: number } | { b: string, m(): number, p: number } =
    { [ab]: 'hi', m() { return 1 }, get p() { return 2 } }
//   other literal types: number, enum (string and number)
const n: { "1": string } | { "2": string } = { [onetwo]: 'hi' }
const e: { "0": string } | { "1": string } = { [alphabet]: 'hi' }

//   destructuring
declare let u: { a: string } | { b: string }
({ [ab]: du } = u) // implicit any error
var du: any
declare let sig: { [s: string]: string }
({ [ab]: ds } = sig) // fine, comes from index signature
var ds: string

var duo: any
var dso: string
var { [ab]: duo } = u   // implicit any error (or similar to the singleton one)
var { [ab]: dso } = sig // fine

// number index signatures
declare let sin: { [n: number]: number }
var dn: number
({ [onetwo]: dn } = sin) // fine, from index signature
var dno: number
var { [onetwo]: dno } = sin // fine, from index signature

// # 16789
declare const textMap: {[key: string]: string}

function getText (s: string, n: number) {
    var { [s]: rawText = s } = sig;
    var { [n]: rawNumber = n } = sin;
    ({ [s]: rawText } = sig);
    ({ [n]: rawNumber } = sin);
    var { [s]: noSig } = {};
    ({ [s]: noSig } = {});
}
