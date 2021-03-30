//// [templateLiteralTypesPatterns.ts]
type RequiresLeadingSlash = `/${string}`;

// ok
const a: RequiresLeadingSlash = "/bin";

// not ok
const b: RequiresLeadingSlash = "no slash";

type Protocol<T extends string, U extends string> = `${T}://${U}`;
function download(hostSpec: Protocol<"http" | "https" | "ftp", string>) { }
// ok, has protocol
download("http://example.com/protocol");
// issues error - no protocol
download("example.com/noprotocol");
// issues error, incorrect protocol
download("gopher://example.com/protocol");

const q: RequiresLeadingSlash extends string ? true : false = true;

declare function bools(x: `${boolean}`): void;
// ok
bools("true");
bools("false");

// not ok
bools("other");

type Pat<T extends string | null | undefined> = `${T}`
declare function nullishes(x: Pat<null | undefined>): void;
// ok
nullishes("null");
nullishes("undefined");

// not ok
nullishes("0");
nullishes("false");
nullishes("NaN");
nullishes("");
nullishes("other");

declare function numbers(x: `${number}`): void;
// the following should work
numbers("1");
numbers("-1");
numbers("0");
numbers("0b1");
numbers("0x1");
numbers("0o1");
numbers("1e21");
numbers("1E21");
numbers("1e-21");
numbers("1E-21");
numbers("1.1");
numbers("-1.1");
numbers("-1.1e-10");
numbers("-1.1E-10");
numbers("1.1e-10");

// the following should be errors since they're not numbers
numbers("?");
numbers("NaN");
numbers("Infinity");
numbers("+Infinity");
numbers("-Infinity");
numbers("1_000");

// the following should be errors since they don't match the pattern
numbers("a10");
numbers("10a");

// whitespace and comments aren't part of numbers
numbers("- 1");
numbers("-/**/1");

declare function bigints(x: `${bigint}`): void;
// the following should work
bigints("1");
bigints("-1");
bigints("0");
bigints("0b1");
bigints("0x1");
bigints("0o1");

// bigints do not allow scientific notation in their parsing/scanning, so these are all errors
bigints("1e21");
bigints("1E21");
bigints("1e-21");
bigints("1E-21");

// these are all errors because they're not big_int_s
bigints("1.0");
bigints("1.1");
bigints("-1.1");
bigints("-1.1e-10");
bigints("-1.1E-10");
bigints("1.1e-10");

// the following should be errors since they're not numbers
bigints("?");
bigints("NaN");
bigints("Infinity");
bigints("+Infinity");
bigints("-Infinity");
bigints("1_000");

// whitespace and comments aren't part of numbers
bigints("- 1");
bigints("-/**/1");

// the following should be errors since they don't match the pattern
bigints("a10n");
bigints("10an");

// the following should all be errors because the `BigInt` constructor (and thus bigint parsing) doesn't take the trailing `n` used in literals
bigints("1n");
bigints("-1n");
bigints("0n");
bigints("0b1n");
bigints("0x1n");
bigints("0o1n");
bigints("1e21n");
bigints("1E21n");
bigints("1e-21n");
bigints("1E-21n");
bigints("1.1n");
bigints("-1.1n");
bigints("-1.1e-10n");
bigints("-1.1E-10n");
bigints("1.1e-10n");

type AStr = `a${string}`;
type ANum = `a${number}`;
type AAny = `a${any}`;

declare var str: AStr;
declare var num: ANum;
declare var anyish: AAny;

// not ok
num = str;
anyish = `bno`

// ok
str = num;
anyish = str;
str = anyish;
anyish = num;
num = anyish;
anyish = `aok`


// Validates variance isn't measured as strictly covariant
type AGen<T extends string | number> = {field: `a${T}`};
const shouldWork1: AGen<string> = null as any as AGen<"yes">;
const shouldWork2: AGen<string> = null as any as AGen<number>;

// validates concatenation of patterns
type A = `${number}`;
type B = `${A} ${A}`;
const exampleBad: B = "anything"; // fails
const exampleGood: B = "1 2"; // ok

// Repro from #41161

var aa: '0';
var aa: '0' & `${number}`;

// Remove string literals from unions with matching template literals

let t1: `foo${string}` | 'foo1' | '1foo';  // `foo${string}` | '1foo'
let t2: `foo1` | '1foo' | 'foofoo' | `foo${string}` | 'foox' | 'xfoo';  // `foo${string}` | '1foo' | 'xfoo'
let t3: `foo1` | '1foo' | 'foofoo' | `foo${string}` | 'foox' | 'xfoo' | `${number}foo`;  // `foo${string}` | xfoo' | `${number}foo`

var bb: `${number}`;
var bb: `${number}` | '0';

// Normalize `${string}` to just string

type T2S<A extends string, B extends string> = `${A}${B}`;

type S10 = `${string}`;  // string
type S11 = `${string}${string}${string}`;  // string
type S12 = T2S<string, string>;  // string

function ff1(x: `${string}-${string}`) {
    let s1 = x && 42;  // number
    let s2 = x || 42;  // `${string}-${string}`
}

// Repro from #41651

export type Id<TA, TId extends string = string> = `${TId}-${TId}`;

export class AA {}

export abstract class BB {
    abstract get(id: Id<AA>): void;
    update(id: Id<AA>): void {
        this.get(id!);
    }
}


//// [templateLiteralTypesPatterns.js]
"use strict";
exports.__esModule = true;
exports.BB = exports.AA = void 0;
// ok
var a = "/bin";
// not ok
var b = "no slash";
function download(hostSpec) { }
// ok, has protocol
download("http://example.com/protocol");
// issues error - no protocol
download("example.com/noprotocol");
// issues error, incorrect protocol
download("gopher://example.com/protocol");
var q = true;
// ok
bools("true");
bools("false");
// not ok
bools("other");
// ok
nullishes("null");
nullishes("undefined");
// not ok
nullishes("0");
nullishes("false");
nullishes("NaN");
nullishes("");
nullishes("other");
// the following should work
numbers("1");
numbers("-1");
numbers("0");
numbers("0b1");
numbers("0x1");
numbers("0o1");
numbers("1e21");
numbers("1E21");
numbers("1e-21");
numbers("1E-21");
numbers("1.1");
numbers("-1.1");
numbers("-1.1e-10");
numbers("-1.1E-10");
numbers("1.1e-10");
// the following should be errors since they're not numbers
numbers("?");
numbers("NaN");
numbers("Infinity");
numbers("+Infinity");
numbers("-Infinity");
numbers("1_000");
// the following should be errors since they don't match the pattern
numbers("a10");
numbers("10a");
// whitespace and comments aren't part of numbers
numbers("- 1");
numbers("-/**/1");
// the following should work
bigints("1");
bigints("-1");
bigints("0");
bigints("0b1");
bigints("0x1");
bigints("0o1");
// bigints do not allow scientific notation in their parsing/scanning, so these are all errors
bigints("1e21");
bigints("1E21");
bigints("1e-21");
bigints("1E-21");
// these are all errors because they're not big_int_s
bigints("1.0");
bigints("1.1");
bigints("-1.1");
bigints("-1.1e-10");
bigints("-1.1E-10");
bigints("1.1e-10");
// the following should be errors since they're not numbers
bigints("?");
bigints("NaN");
bigints("Infinity");
bigints("+Infinity");
bigints("-Infinity");
bigints("1_000");
// whitespace and comments aren't part of numbers
bigints("- 1");
bigints("-/**/1");
// the following should be errors since they don't match the pattern
bigints("a10n");
bigints("10an");
// the following should all be errors because the `BigInt` constructor (and thus bigint parsing) doesn't take the trailing `n` used in literals
bigints("1n");
bigints("-1n");
bigints("0n");
bigints("0b1n");
bigints("0x1n");
bigints("0o1n");
bigints("1e21n");
bigints("1E21n");
bigints("1e-21n");
bigints("1E-21n");
bigints("1.1n");
bigints("-1.1n");
bigints("-1.1e-10n");
bigints("-1.1E-10n");
bigints("1.1e-10n");
// not ok
num = str;
anyish = "bno";
// ok
str = num;
anyish = str;
str = anyish;
anyish = num;
num = anyish;
anyish = "aok";
var shouldWork1 = null;
var shouldWork2 = null;
var exampleBad = "anything"; // fails
var exampleGood = "1 2"; // ok
// Repro from #41161
var aa;
var aa;
// Remove string literals from unions with matching template literals
var t1; // `foo${string}` | '1foo'
var t2; // `foo${string}` | '1foo' | 'xfoo'
var t3; // `foo${string}` | xfoo' | `${number}foo`
var bb;
var bb;
function ff1(x) {
    var s1 = x && 42; // number
    var s2 = x || 42; // `${string}-${string}`
}
var AA = /** @class */ (function () {
    function AA() {
    }
    return AA;
}());
exports.AA = AA;
var BB = /** @class */ (function () {
    function BB() {
    }
    BB.prototype.update = function (id) {
        this.get(id);
    };
    return BB;
}());
exports.BB = BB;
