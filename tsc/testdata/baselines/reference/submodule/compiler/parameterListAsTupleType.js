//// [tests/cases/compiler/parameterListAsTupleType.ts] ////

//// [parameterListAsTupleType.ts]
function foo(a: number, b: string) {
  return true;
}
type Foops = Parameters<typeof foo>;

const x = (a: number) => 5;
type Xps = Parameters<typeof x>;
const a: Xps = ['should-not-work']; // works, but shouldn't
function t(...args: Xps) {} // should work

class C {
    constructor(a: number, b: string) {
    }
}

type Cps = Parameters<typeof C>; // should not work
type Ccps = ConstructorParameters<typeof C>; // should be [number, string]

class D {
    constructor(a: number, ...rest: string[]) {
    }
}
type Dcps = ConstructorParameters<typeof D>; // should be [number, ...string[]]


//// [parameterListAsTupleType.js]
function foo(a, b) {
    return true;
}
const x = (a) => 5;
const a = ['should-not-work']; // works, but shouldn't
function t(...args) { } // should work
class C {
    constructor(a, b) {
    }
}
class D {
    constructor(a, ...rest) {
    }
}
