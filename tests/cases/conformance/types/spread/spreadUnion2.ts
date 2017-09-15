// @strictNullChecks: true

declare const undefinedUnion: { a: number } | undefined;
declare const nullUnion: { b: number } | null;

var o1: { a?: number | undefined };
var o1 = { ...undefinedUnion };

var o2: { b?: number | undefined };
var o2 = { ...nullUnion };

var o3: { a?: number | undefined, b?: number | undefined };
var o3 = { ...undefinedUnion, ...nullUnion };
var o3 = { ...nullUnion, ...undefinedUnion };

var o4: { a?: number | undefined };
var o4 = { ...undefinedUnion, ...undefinedUnion };

var o5: { b?: number | undefined };
var o5 = { ...nullUnion, ...nullUnion };

