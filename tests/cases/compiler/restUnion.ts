var union: { a: number, c: boolean } | { a: string, b: string };

var rest1: { c: boolean } | { b: string };
var {a, ...rest1 } = union;


var undefinedUnion: { n: number } | undefined;
var rest2: {};
var {n, ...rest2 } = undefinedUnion;


var nullUnion: { n: number } | null;
var rest3: {};
var {n, ...rest3 } = nullUnion;
