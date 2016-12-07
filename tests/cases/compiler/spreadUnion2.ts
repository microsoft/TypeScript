// @strictNullChecks: true

declare const undefinedUnion: { a: number } | undefined;
declare const nullUnion: { b: number } | null;
declare const nullAndUndefinedUnion: null | undefined;

var o1: { a: number };
var o1 = { ...undefinedUnion };

var o2: { b: number };
var o2 = { ...nullUnion };

var o3: { a: number, b: number };
var o3 = { ...undefinedUnion, ...nullUnion };
var o3 = { ...nullUnion, ...undefinedUnion };

var o4: { a: number };
var o4 = { ...undefinedUnion, ...undefinedUnion };

var o5: { b: number };
var o5 = { ...nullUnion, ...nullUnion };

var o6: { };
var o6 = { ...nullAndUndefinedUnion, ...nullAndUndefinedUnion };
var o6 = { ...nullAndUndefinedUnion };