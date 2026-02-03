//// [tests/cases/conformance/types/mapped/mappedTypeErrors.ts] ////

//// [mappedTypeErrors.ts]
interface Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}

interface Named {
    name: string;
}

interface Point {
    x: number;
    y: number;
}

// Constraint checking

type T00 = { [P in P]: string };  // Error
type T01 = { [P in number]: string };  // Error
type T02 = { [P in Date]: number };  // Error
type T03 = Record<Date, number>;  // Error

type T10 = Pick<Shape, "name">;
type T11 = Pick<Shape, "foo">;  // Error
type T12 = Pick<Shape, "name" | "foo">;  // Error
type T13 = Pick<Shape, keyof Named>;
type T14 = Pick<Shape, keyof Point>;  // Error
type T15 = Pick<Shape, never>;
type T16 = Pick<Shape, undefined>;  // Error

function f1<T>(x: T) {
    let y: Pick<Shape, T>;  // Error
}

function f2<T extends string | number>(x: T) {
    let y: Pick<Shape, T>;  // Error
}

function f3<T extends keyof Shape>(x: T) {
    let y: Pick<Shape, T>;
}

function f4<T extends keyof Named>(x: T) {
    let y: Pick<Shape, T>;
}

// Type identity checking

function f10<T>() {
    type K = keyof T;
    var x: { [P in keyof T]: T[P] };
    var x: { [Q in keyof T]: T[Q] };
    var x: { [R in K]: T[R] };
}

function f11<T>() {
    var x: { [P in keyof T]: T[P] };
    var x: { [P in keyof T]?: T[P] };  // Error
    var x: { readonly [P in keyof T]: T[P] };  // Error
    var x: { readonly [P in keyof T]?: T[P] };  // Error
}

function f12<T>() {
    var x: { [P in keyof T]: T[P] };
    var x: { [P in keyof T]: T[P][] };  // Error
}

// Check that inferences to mapped types are secondary

declare function objAndReadonly<T>(primary: T, secondary: Readonly<T>): T;
declare function objAndPartial<T>(primary: T, secondary: Partial<T>): T;

function f20() {
    let x1 = objAndReadonly({ x: 0, y: 0 }, { x: 1 });  // Error
    let x2 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1 });
    let x3 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 });  // Error
}

function f21() {
    let x1 = objAndPartial({ x: 0, y: 0 }, { x: 1 });
    let x2 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1 });
    let x3 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 });  // Error
}

// Verify use of Pick<T, K> for setState functions (#12793)

interface Foo {
    a: string;
    b?: number;
}

function setState<T, K extends keyof T>(obj: T, props: Pick<T, K>) {
    for (let k in props) {
        obj[k] = props[k];
    }
}

let foo: Foo = { a: "hello", b: 42 };
setState(foo, { a: "test", b: 43 })
setState(foo, { a: "hi" });
setState(foo, { b: undefined });
setState(foo, { });
setState(foo, foo);
setState(foo, { a: undefined });  // Error
setState(foo, { c: true });  // Error

class C<T> {
    state: T;
    setState<K extends keyof T>(props: Pick<T, K>) {
        for (let k in props) {
            this.state[k] = props[k];
        }
    }
}

let c = new C<Foo>();
c.setState({ a: "test", b: 43 });
c.setState({ a: "hi" });
c.setState({ b: undefined });
c.setState({ });
c.setState(foo);
c.setState({ a: undefined });  // Error
c.setState({ c: true });  // Error

type T2 = { a?: number, [key: string]: any };

let x1: T2 = { a: 'no' };  // Error
let x2: Partial<T2> = { a: 'no' }; // Error
let x3: { [P in keyof T2]: T2[P]} = { a: 'no' };  // Error

// Repro from #13044

type Foo2<T, F extends keyof T> = {
    pf: {[P in F]?: T[P]},
    pt: {[P in T]?: T[P]}, // note: should be in keyof T
};
type O = {x: number, y: boolean};
let o: O = {x: 5, y: false};
let f: Foo2<O, 'x'> = {
    pf: {x: 7},
    pt: {x: 7, y: false},
};

// Repro from #28170

function test1<T, K extends keyof T>(obj: Pick<T, K>) {
    let x = obj.foo;  // Error
}

function test2<T, K extends keyof T>(obj: Record<K, number>) {
    let x = obj.foo;  // Error
}


//// [mappedTypeErrors.js]
function f1(x) {
    var y; // Error
}
function f2(x) {
    var y; // Error
}
function f3(x) {
    var y;
}
function f4(x) {
    var y;
}
// Type identity checking
function f10() {
    var x;
    var x;
    var x;
}
function f11() {
    var x;
    var x; // Error
    var x; // Error
    var x; // Error
}
function f12() {
    var x;
    var x; // Error
}
function f20() {
    var x1 = objAndReadonly({ x: 0, y: 0 }, { x: 1 }); // Error
    var x2 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1 });
    var x3 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 }); // Error
}
function f21() {
    var x1 = objAndPartial({ x: 0, y: 0 }, { x: 1 });
    var x2 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1 });
    var x3 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 }); // Error
}
function setState(obj, props) {
    for (var k in props) {
        obj[k] = props[k];
    }
}
var foo = { a: "hello", b: 42 };
setState(foo, { a: "test", b: 43 });
setState(foo, { a: "hi" });
setState(foo, { b: undefined });
setState(foo, {});
setState(foo, foo);
setState(foo, { a: undefined }); // Error
setState(foo, { c: true }); // Error
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.setState = function (props) {
        for (var k in props) {
            this.state[k] = props[k];
        }
    };
    return C;
}());
var c = new C();
c.setState({ a: "test", b: 43 });
c.setState({ a: "hi" });
c.setState({ b: undefined });
c.setState({});
c.setState(foo);
c.setState({ a: undefined }); // Error
c.setState({ c: true }); // Error
var x1 = { a: 'no' }; // Error
var x2 = { a: 'no' }; // Error
var x3 = { a: 'no' }; // Error
var o = { x: 5, y: false };
var f = {
    pf: { x: 7 },
    pt: { x: 7, y: false },
};
// Repro from #28170
function test1(obj) {
    var x = obj.foo; // Error
}
function test2(obj) {
    var x = obj.foo; // Error
}


//// [mappedTypeErrors.d.ts]
interface Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}
interface Named {
    name: string;
}
interface Point {
    x: number;
    y: number;
}
type T00 = {
    [P in P]: string;
};
type T01 = {
    [P in number]: string;
};
type T02 = {
    [P in Date]: number;
};
type T03 = Record<Date, number>;
type T10 = Pick<Shape, "name">;
type T11 = Pick<Shape, "foo">;
type T12 = Pick<Shape, "name" | "foo">;
type T13 = Pick<Shape, keyof Named>;
type T14 = Pick<Shape, keyof Point>;
type T15 = Pick<Shape, never>;
type T16 = Pick<Shape, undefined>;
declare function f1<T>(x: T): void;
declare function f2<T extends string | number>(x: T): void;
declare function f3<T extends keyof Shape>(x: T): void;
declare function f4<T extends keyof Named>(x: T): void;
declare function f10<T>(): void;
declare function f11<T>(): void;
declare function f12<T>(): void;
declare function objAndReadonly<T>(primary: T, secondary: Readonly<T>): T;
declare function objAndPartial<T>(primary: T, secondary: Partial<T>): T;
declare function f20(): void;
declare function f21(): void;
interface Foo {
    a: string;
    b?: number;
}
declare function setState<T, K extends keyof T>(obj: T, props: Pick<T, K>): void;
declare let foo: Foo;
declare class C<T> {
    state: T;
    setState<K extends keyof T>(props: Pick<T, K>): void;
}
declare let c: C<Foo>;
type T2 = {
    a?: number;
    [key: string]: any;
};
declare let x1: T2;
declare let x2: Partial<T2>;
declare let x3: {
    [P in keyof T2]: T2[P];
};
type Foo2<T, F extends keyof T> = {
    pf: {
        [P in F]?: T[P];
    };
    pt: {
        [P in T]?: T[P];
    };
};
type O = {
    x: number;
    y: boolean;
};
declare let o: O;
declare let f: Foo2<O, 'x'>;
declare function test1<T, K extends keyof T>(obj: Pick<T, K>): void;
declare function test2<T, K extends keyof T>(obj: Record<K, number>): void;
