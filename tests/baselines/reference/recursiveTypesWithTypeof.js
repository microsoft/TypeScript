//// [tests/cases/conformance/types/specifyingTypes/typeQueries/recursiveTypesWithTypeof.ts] ////

//// [recursiveTypesWithTypeof.ts]
// The following are errors because of circular references
var c: typeof c;
var c: any;
var d: typeof e;
var d: any;
var e: typeof d;
var e: any;

interface Foo<T> { }
var f: Array<typeof f>;
var f: any;
var f2: Foo<typeof f2>;
var f2: any;
var f3: Foo<typeof f3>[];
var f3: any;

// None of these declarations should have any errors!
// Truly recursive types
var g: { x: typeof g; };
var g: typeof g.x;
var h: () => typeof h;
var h = h();
var i: (x: typeof i) => typeof x;
var i = i(i);
var j: <T extends typeof j>(x: T) => T;
var j = j(j);

// Same as h, i, j with construct signatures
var h2: new () => typeof h2;
var h2 = new h2();
var i2: new (x: typeof i2) => typeof x;
var i2 = new i2(i2);
var j2: new <T extends typeof j2>(x: T) => T;
var j2 = new j2(j2);

// Indexers
var k: { [n: number]: typeof k;[s: string]: typeof k };
var k = k[0];
var k = k[''];

// Hybrid - contains type literals as well as type arguments
// These two are recursive
var hy1: { x: typeof hy1 }[];
var hy1 = hy1[0].x;
var hy2: { x: Array<typeof hy2> };
var hy2 = hy2.x[0];

interface Foo2<T, U> { }

// This one should be an error because the first type argument is not contained inside a type literal
var hy3: Foo2<typeof hy3, { x: typeof hy3 }>;
var hy3: any;

//// [recursiveTypesWithTypeof.js]
// The following are errors because of circular references
var c;
var c;
var d;
var d;
var e;
var e;
var f;
var f;
var f2;
var f2;
var f3;
var f3;
// None of these declarations should have any errors!
// Truly recursive types
var g;
var g;
var h;
var h = h();
var i;
var i = i(i);
var j;
var j = j(j);
// Same as h, i, j with construct signatures
var h2;
var h2 = new h2();
var i2;
var i2 = new i2(i2);
var j2;
var j2 = new j2(j2);
// Indexers
var k;
var k = k[0];
var k = k[''];
// Hybrid - contains type literals as well as type arguments
// These two are recursive
var hy1;
var hy1 = hy1[0].x;
var hy2;
var hy2 = hy2.x[0];
// This one should be an error because the first type argument is not contained inside a type literal
var hy3;
var hy3;
