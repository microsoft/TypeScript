//// [tests/cases/compiler/restUnion2.ts] ////

//// [restUnion2.ts]
declare const undefinedUnion: { n: number } | undefined;
var rest2: { n: number };
var {...rest2 } = undefinedUnion;


declare const nullUnion: { n: number } | null;
var rest3: { n: number };
var {...rest3 } = nullUnion;


//// [restUnion2.js]
var rest2;
var { ...rest2 } = undefinedUnion;
var rest3;
var { ...rest3 } = nullUnion;
