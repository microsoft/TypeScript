// @strictNullChecks: true

declare const undefinedUnion: { n: number } | undefined;
var rest2: { n: number };
var {...rest2 } = undefinedUnion;


declare const nullUnion: { n: number } | null;
var rest3: { n: number };
var {...rest3 } = nullUnion;


declare const nullAndUndefinedUnion: null | undefined;
var rest4: { };
var {...rest4 } = nullAndUndefinedUnion;

declare const unionWithIntersection: ({ n: number } & { s: string }) & undefined | null;
var rest5: { n: number, s: string };
var {...rest5 } = unionWithIntersection;