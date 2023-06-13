//// [tests/cases/conformance/expressions/objectLiterals/objectLiteralErrors.ts] ////

//// [objectLiteralErrors.ts]
// Multiple properties with the same name
var e1 = { a: 0, a: 0 };
var e2 = { a: '', a: '' };
var e3 = { a: 0, a: '' };
var e4 = { a: true, a: false };
var e5 = { a: {}, a: {} };
var e6 = { a: 0, 'a': 0 };
var e7 = { 'a': 0, a: 0 };
var e8 = { 'a': 0, "a": 0 };
var e9 = { 'a': 0, 'a': 0 };
var e10 = { "a": 0, 'a': 0 };
var e11 = { 1.0: 0, '1': 0 };
var e12 = { 0: 0, 0: 0 };
var e13 = { 0: 0, 0: 0 };
var e14 = { 0: 0, 0x0: 0 };
var e14 = { 0: 0, 0o0: 0 };
var e15 = { "100": 0, 1e2: 0 };
var e16 = { 0x20: 0, 3.2e1: 0 };
var e17 = { a: 0, b: 1, a: 0 };

// Accessor and property with the same name
var f1 = { a: 0, get a() { return 0; } };
var f2 = { a: '', get a() { return ''; } };
var f3 = { a: 0, get a() { return ''; } };
var f4 = { a: true, get a() { return false; } };
var f5 = { a: {}, get a() { return {}; } };
var f6 = { a: 0, get 'a'() { return 0; } };
var f7 = { 'a': 0, get a() { return 0; } };
var f8 = { 'a': 0, get "a"() { return 0; } };
var f9 = { 'a': 0, get 'a'() { return 0; } };
var f10 = { "a": 0, get 'a'() { return 0; } };
var f11 = { 1.0: 0, get '1'() { return 0; } };
var f12 = { 0: 0, get 0() { return 0; } };
var f13 = { 0: 0, get 0() { return 0; } };
var f14 = { 0: 0, get 0x0() { return 0; } };
var f14 = { 0: 0, get 0o0() { return 0; } };
var f15 = { "100": 0, get 1e2() { return 0; } };
var f16 = { 0x20: 0, get 3.2e1() { return 0; } };
var f17 = { a: 0, get b() { return 1; }, get a() { return 0; } };

// Get and set accessor with mismatched type annotations (only g2 is an error after #43662 implemented)
var g1 = { get a(): number { return 4; }, set a(n: string) { } };
var g2 = { get a() { return 4; }, set a(n: string) { } };
var g3 = { get a(): number { return undefined; }, set a(n: string) { } };

// did you mean colon errors
var h1 = {
    x = 1,
    y = 2,
    #z: 3
}


//// [objectLiteralErrors.js]
// Multiple properties with the same name
var e1 = { a: 0, a: 0 };
var e2 = { a: '', a: '' };
var e3 = { a: 0, a: '' };
var e4 = { a: true, a: false };
var e5 = { a: {}, a: {} };
var e6 = { a: 0, 'a': 0 };
var e7 = { 'a': 0, a: 0 };
var e8 = { 'a': 0, "a": 0 };
var e9 = { 'a': 0, 'a': 0 };
var e10 = { "a": 0, 'a': 0 };
var e11 = { 1.0: 0, '1': 0 };
var e12 = { 0: 0, 0: 0 };
var e13 = { 0: 0, 0: 0 };
var e14 = { 0: 0, 0x0: 0 };
var e14 = { 0: 0, 0: 0 };
var e15 = { "100": 0, 1e2: 0 };
var e16 = { 0x20: 0, 3.2e1: 0 };
var e17 = { a: 0, b: 1, a: 0 };
// Accessor and property with the same name
var f1 = { a: 0, get a() { return 0; } };
var f2 = { a: '', get a() { return ''; } };
var f3 = { a: 0, get a() { return ''; } };
var f4 = { a: true, get a() { return false; } };
var f5 = { a: {}, get a() { return {}; } };
var f6 = { a: 0, get 'a'() { return 0; } };
var f7 = { 'a': 0, get a() { return 0; } };
var f8 = { 'a': 0, get "a"() { return 0; } };
var f9 = { 'a': 0, get 'a'() { return 0; } };
var f10 = { "a": 0, get 'a'() { return 0; } };
var f11 = { 1.0: 0, get '1'() { return 0; } };
var f12 = { 0: 0, get 0() { return 0; } };
var f13 = { 0: 0, get 0() { return 0; } };
var f14 = { 0: 0, get 0x0() { return 0; } };
var f14 = { 0: 0, get 0o0() { return 0; } };
var f15 = { "100": 0, get 1e2() { return 0; } };
var f16 = { 0x20: 0, get 3.2e1() { return 0; } };
var f17 = { a: 0, get b() { return 1; }, get a() { return 0; } };
// Get and set accessor with mismatched type annotations (only g2 is an error after #43662 implemented)
var g1 = { get a() { return 4; }, set a(n) { } };
var g2 = { get a() { return 4; }, set a(n) { } };
var g3 = { get a() { return undefined; }, set a(n) { } };
// did you mean colon errors
var h1 = {
    x: x,
    y: y,
    : 3
};
