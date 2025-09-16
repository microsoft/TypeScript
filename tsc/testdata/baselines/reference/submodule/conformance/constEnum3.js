//// [tests/cases/conformance/constEnums/constEnum3.ts] ////

//// [constEnum3.ts]
const enum TestType { foo, bar }
type TestTypeStr = keyof typeof TestType;

function f1(f: TestType) { }
function f2(f: TestTypeStr) { }

f1(TestType.foo)
f1(TestType.bar)
f2('foo')
f2('bar')


//// [constEnum3.js]
function f1(f) { }
function f2(f) { }
f1(0 /* TestType.foo */);
f1(1 /* TestType.bar */);
f2('foo');
f2('bar');
