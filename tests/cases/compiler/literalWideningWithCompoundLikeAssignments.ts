// @strict: true
// @noEmit: true

// repro from #13865

const empty: "" = "";
let foo = empty;
foo = foo + "bar"
foo // string

declare const numLiteral: 0;

let t1 = numLiteral;
t1 = t1 + 42
t1 // number

let t2 = numLiteral;
t2 = t2 - 42
t2 // number

let t3 = numLiteral;
t3 = t3 * 42
t3 // number

let t4 = numLiteral;
t4 = t4 ** 42
t4 // number

let t5 = numLiteral;
t5 = t5 / 42
t5 // number

let t6 = numLiteral;
t6 = t6 % 42
t6 // number


declare const literalUnion: "a" | 0;
let t7 = literalUnion;
t7 = t7 + 'b'
t7 // string
