//// [tests/cases/conformance/expressions/optionalChaining/optionalChainingInTypeAssertions.ts] ////

//// [optionalChainingInTypeAssertions.ts]
class Foo {
    m() {}
}

const foo = new Foo();

(foo.m as any)?.();
(<any>foo.m)?.();

/*a1*/(/*a2*/foo.m as any/*a3*/)/*a4*/?.();
/*b1*/(/*b2*/<any>foo.m/*b3*/)/*b4*/?.();

// https://github.com/microsoft/TypeScript/issues/50148
(foo?.m as any).length;
(<any>foo?.m).length;
(foo?.["m"] as any).length;
(<any>foo?.["m"]).length;

//// [optionalChainingInTypeAssertions.js]
var _a, _b, _c, _d;
class Foo {
    m() { }
}
const foo = new Foo();
(_a = foo.m) === null || _a === void 0 ? void 0 : _a.call(foo);
(_b = foo.m) === null || _b === void 0 ? void 0 : _b.call(foo);
/*a1*/ (_c = /*a2*/ foo.m /*a3*/ /*a4*/) === null || _c === void 0 ? void 0 : _c.call(foo);
/*b1*/ (_d = /*b2*/ foo.m /*b3*/ /*b4*/) === null || _d === void 0 ? void 0 : _d.call(foo);
// https://github.com/microsoft/TypeScript/issues/50148
(foo === null || foo === void 0 ? void 0 : foo.m).length;
(foo === null || foo === void 0 ? void 0 : foo.m).length;
(foo === null || foo === void 0 ? void 0 : foo["m"]).length;
(foo === null || foo === void 0 ? void 0 : foo["m"]).length;
