//// [tests/cases/compiler/restUnion3.ts] ////

//// [restUnion3.ts]
declare const nullAndUndefinedUnion: null | undefined;
var rest4: { };
var {...rest4 } = nullAndUndefinedUnion;

declare const unionWithIntersection: ({ n: number } & { s: string }) & undefined;
var rest5: { n: number, s: string };
var {...rest5 } = unionWithIntersection;


//// [restUnion3.js]
var rest4;
var { ...rest4 } = nullAndUndefinedUnion;
var rest5;
var { ...rest5 } = unionWithIntersection;
