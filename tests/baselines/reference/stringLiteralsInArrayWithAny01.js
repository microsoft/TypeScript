//// [stringLiteralsInArrayWithAny01.ts]

const c: any = null;
const src = ["hello", c];

const okayDest: string[] = src;
const badDest = number[] = src;

//// [stringLiteralsInArrayWithAny01.js]
var c = null;
var src = ["hello", c];
var okayDest = src;
var badDest = number[] = src;


//// [stringLiteralsInArrayWithAny01.d.ts]
declare const c: any;
declare const src: any[];
declare const okayDest: string[];
declare const badDest: any[];
