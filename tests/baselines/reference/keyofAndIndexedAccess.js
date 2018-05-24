//// [keyofAndIndexedAccess.ts]
class Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}

class TaggedShape extends Shape {
    tag: string;
}

class Item {
    name: string;
    price: number;
}

class Options {
    visible: "yes" | "no";
}

type Dictionary<T> = { [x: string]: T };
type NumericallyIndexed<T> = { [x: number]: T };

const enum E { A, B, C }

type K00 = keyof any;  // string
type K01 = keyof string;  // "toString" | "charAt" | ...
type K02 = keyof number;  // "toString" | "toFixed" | "toExponential" | ...
type K03 = keyof boolean;  // "valueOf"
type K04 = keyof void;  // never
type K05 = keyof undefined;  // never
type K06 = keyof null;  // never
type K07 = keyof never;  // never

type K10 = keyof Shape;  // "name" | "width" | "height" | "visible"
type K11 = keyof Shape[];  // "length" | "toString" | ...
type K12 = keyof Dictionary<Shape>;  // string
type K13 = keyof {};  // never
type K14 = keyof Object;  // "constructor" | "toString" | ...
type K15 = keyof E;  // "toString" | "toFixed" | "toExponential" | ...
type K16 = keyof [string, number];  // "0" | "1" | "length" | "toString" | ...
type K17 = keyof (Shape | Item);  // "name"
type K18 = keyof (Shape & Item);  // "name" | "width" | "height" | "visible" | "price"
type K19 = keyof NumericallyIndexed<Shape> // never

type KeyOf<T> = keyof T;

type K20 = KeyOf<Shape>;  // "name" | "width" | "height" | "visible"
type K21 = KeyOf<Dictionary<Shape>>;  // string

type NAME = "name";
type WIDTH_OR_HEIGHT = "width" | "height";

type Q10 = Shape["name"];  // string
type Q11 = Shape["width" | "height"];  // number
type Q12 = Shape["name" | "visible"];  // string | boolean

type Q20 = Shape[NAME];  // string
type Q21 = Shape[WIDTH_OR_HEIGHT];  // number

type Q30 = [string, number][0];  // string
type Q31 = [string, number][1];  // number
type Q32 = [string, number][2];  // string | number
type Q33 = [string, number][E.A];  // string
type Q34 = [string, number][E.B];  // number
type Q35 = [string, number][E.C];  // string | number
type Q36 = [string, number]["0"];  // string
type Q37 = [string, number]["1"];  // string

type Q40 = (Shape | Options)["visible"];  // boolean | "yes" | "no"
type Q41 = (Shape & Options)["visible"];  // true & "yes" | true & "no" | false & "yes" | false & "no"

type Q50 = Dictionary<Shape>["howdy"];  // Shape
type Q51 = Dictionary<Shape>[123];  // Shape
type Q52 = Dictionary<Shape>[E.B];  // Shape

declare let cond: boolean;

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

function f10(shape: Shape) {
    let name = getProperty(shape, "name");  // string
    let widthOrHeight = getProperty(shape, cond ? "width" : "height");  // number
    let nameOrVisible = getProperty(shape, cond ? "name" : "visible");  // string | boolean
    setProperty(shape, "name", "rectangle");
    setProperty(shape, cond ? "width" : "height", 10);
    setProperty(shape, cond ? "name" : "visible", true);  // Technically not safe
}

function f11(a: Shape[]) {
    let len = getProperty(a, "length");  // number
    setProperty(a, "length", len);
}

function f12(t: [Shape, boolean]) {
    let len = getProperty(t, "length");
    let s2 = getProperty(t, "0");  // Shape
    let b2 = getProperty(t, "1");  // boolean
}

function f13(foo: any, bar: any) {
    let x = getProperty(foo, "x");  // any
    let y = getProperty(foo, "100");  // any
    let z = getProperty(foo, bar);  // any
}

class Component<PropType> {
    props: PropType;
    getProperty<K extends keyof PropType>(key: K) {
        return this.props[key];
    }
    setProperty<K extends keyof PropType>(key: K, value: PropType[K]) {
        this.props[key] = value;
    }
}

function f20(component: Component<Shape>) {
    let name = component.getProperty("name");  // string
    let widthOrHeight = component.getProperty(cond ? "width" : "height");  // number
    let nameOrVisible = component.getProperty(cond ? "name" : "visible");  // string | boolean
    component.setProperty("name", "rectangle");
    component.setProperty(cond ? "width" : "height", 10)
    component.setProperty(cond ? "name" : "visible", true);  // Technically not safe
}

function pluck<T, K extends keyof T>(array: T[], key: K) {
    return array.map(x => x[key]);
}

function f30(shapes: Shape[]) {
    let names = pluck(shapes, "name");    // string[]
    let widths = pluck(shapes, "width");  // number[]
    let nameOrVisibles = pluck(shapes, cond ? "name" : "visible");  // (string | boolean)[]
}

function f31<K extends keyof Shape>(key: K) {
    const shape: Shape = { name: "foo", width: 5, height: 10, visible: true };
    return shape[key];  // Shape[K]
}

function f32<K extends "width" | "height">(key: K) {
    const shape: Shape = { name: "foo", width: 5, height: 10, visible: true };
    return shape[key];  // Shape[K]
}

function f33<S extends Shape, K extends keyof S>(shape: S, key: K) {
    let name = getProperty(shape, "name");
    let prop = getProperty(shape, key);
    return prop;
}

function f34(ts: TaggedShape) {
    let tag1 = f33(ts, "tag");
    let tag2 = getProperty(ts, "tag");
}

class C {
    public x: string;
    protected y: string;
    private z: string;
}

// Indexed access expressions have always permitted access to private and protected members.
// For consistency we also permit such access in indexed access types.
function f40(c: C) {
    type X = C["x"];
    type Y = C["y"];
    type Z = C["z"];
    let x: X = c["x"];
    let y: Y = c["y"];
    let z: Z = c["z"];
}

function f50<T>(k: keyof T, s: string) {
    const x1 = s as keyof T;
    const x2 = k as string;
}

function f51<T, K extends keyof T>(k: K, s: string) {
    const x1 = s as keyof T;
    const x2 = k as string;
}

function f52<T>(obj: { [x: string]: boolean }, k: Exclude<keyof T, symbol>, s: string, n: number) {
    const x1 = obj[s];
    const x2 = obj[n];
    const x3 = obj[k];
}

function f53<T, K extends Exclude<keyof T, symbol>>(obj: { [x: string]: boolean }, k: K, s: string, n: number) {
    const x1 = obj[s];
    const x2 = obj[n];
    const x3 = obj[k];
}

function f54<T>(obj: T, key: keyof T) {
    for (let s in obj[key]) {
    }
    const b = "foo" in obj[key];
}

function f55<T, K extends keyof T>(obj: T, key: K) {
    for (let s in obj[key]) {
    }
    const b = "foo" in obj[key];
}

function f60<T>(source: T, target: T) {
    for (let k in source) {
        target[k] = source[k];
    }
}

function f70(func: <T, U>(k1: keyof (T | U), k2: keyof (T & U)) => void) {
    func<{ a: any, b: any }, { a: any, c: any }>('a', 'a');
    func<{ a: any, b: any }, { a: any, c: any }>('a', 'b');
    func<{ a: any, b: any }, { a: any, c: any }>('a', 'c');
}

function f71(func: <T, U>(x: T, y: U) => Partial<T & U>) {
    let x = func({ a: 1, b: "hello" }, { c: true });
    x.a;  // number | undefined
    x.b;  // string | undefined
    x.c;  // boolean | undefined
}

function f72(func: <T, U, K extends keyof T | keyof U>(x: T, y: U, k: K) => (T & U)[K]) {
    let a = func({ a: 1, b: "hello" }, { c: true }, 'a');  // number
    let b = func({ a: 1, b: "hello" }, { c: true }, 'b');  // string
    let c = func({ a: 1, b: "hello" }, { c: true }, 'c');  // boolean
}

function f73(func: <T, U, K extends keyof (T & U)>(x: T, y: U, k: K) => (T & U)[K]) {
    let a = func({ a: 1, b: "hello" }, { c: true }, 'a');  // number
    let b = func({ a: 1, b: "hello" }, { c: true }, 'b');  // string
    let c = func({ a: 1, b: "hello" }, { c: true }, 'c');  // boolean
}

function f74(func: <T, U, K extends keyof (T | U)>(x: T, y: U, k: K) => (T | U)[K]) {
    let a = func({ a: 1, b: "hello" }, { a: 2, b: true }, 'a');  // number
    let b = func({ a: 1, b: "hello" }, { a: 2, b: true }, 'b');  // string | boolean
}

function f80<T extends { a: { x: any } }>(obj: T) {
    let a1 = obj.a;  // { x: any }
    let a2 = obj['a'];  // { x: any }
    let a3 = obj['a'] as T['a'];  // T["a"]
    let x1 = obj.a.x;  // any
    let x2 = obj['a']['x'];  // any
    let x3 = obj['a']['x'] as T['a']['x'];  // T["a"]["x"]
}

function f81<T extends { a: { x: any } }>(obj: T) {
    return obj['a']['x'] as T['a']['x'];
}

function f82() {
    let x1 = f81({ a: { x: "hello" } });  // string
    let x2 = f81({ a: { x: 42 } });  // number
}

function f83<T extends { [x: string]: { x: any } }, K extends keyof T>(obj: T, key: K) {
    return obj[key]['x'] as T[K]['x'];
}

function f84() {
    let x1 = f83({ foo: { x: "hello" } }, "foo");  // string
    let x2 = f83({ bar: { x: 42 } }, "bar");  // number
}

class C1 {
    x: number;
    get<K extends keyof this>(key: K) {
        return this[key];
    }
    set<K extends keyof this>(key: K, value: this[K]) {
        this[key] = value;
    }
    foo() {
        let x1 = this.x;  // number
        let x2 = this["x"];  // number
        let x3 = this.get("x");  // this["x"]
        let x4 = getProperty(this, "x"); // this["x"]
        this.x = 42;
        this["x"] = 42;
        this.set("x", 42);
        setProperty(this, "x", 42);
    }
}

type S2 = {
    a: string;
    b: string;
};

function f90<T extends S2, K extends keyof S2>(x1: S2[keyof S2], x2: T[keyof S2], x3: S2[K], x4: T[K]) {
    x1 = x2;
    x1 = x3;
    x1 = x4;
    x2 = x1;
    x2 = x3;
    x2 = x4;
    x3 = x1;
    x3 = x2;
    x3 = x4;
    x4 = x1;
    x4 = x2;
    x4 = x3;
    x1.length;
    x2.length;
    x3.length;
    x4.length;
}

function f91<T, K extends keyof T>(x: T, y: T[keyof T], z: T[K]) {
    let a: {};
    a = x;
    a = y;
    a = z;
}

function f92<T, K extends keyof T>(x: T, y: T[keyof T], z: T[K]) {
    let a: {} | null | undefined;
    a = x;
    a = y;
    a = z;
}

// Repros from #12011

class Base {
    get<K extends keyof this>(prop: K) {
        return this[prop];
    }
    set<K extends keyof this>(prop: K, value: this[K]) {
        this[prop] = value;
    }
}

class Person extends Base {
    parts: number;
    constructor(parts: number) {
        super();
        this.set("parts", parts);
    }
    getParts() {
        return this.get("parts")
    }
}

class OtherPerson {
    parts: number;
    constructor(parts: number) {
        setProperty(this, "parts", parts);
    }
    getParts() {
        return getProperty(this, "parts")
    }
}

// Modified repro from #12544

function path<T, K1 extends keyof T>(obj: T, key1: K1): T[K1];
function path<T, K1 extends keyof T, K2 extends keyof T[K1]>(obj: T, key1: K1, key2: K2): T[K1][K2];
function path<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(obj: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3];
function path(obj: any, ...keys: (string | number)[]): any;
function path(obj: any, ...keys: (string | number)[]): any {
    let result = obj;
    for (let k of keys) {
        result = result[k];
    }
    return result;
}

type Thing = {
    a: { x: number, y: string },
    b: boolean
};


function f1(thing: Thing) {
    let x1 = path(thing, 'a');  // { x: number, y: string }
    let x2 = path(thing, 'a', 'y');  // string
    let x3 = path(thing, 'b');  // boolean
    let x4 = path(thing, ...['a', 'x']);  // any
}

// Repro from comment in #12114

const assignTo2 = <T, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, key1: K1, key2: K2) =>
    (value: T[K1][K2]) => object[key1][key2] = value;

// Modified repro from #12573

declare function one<T>(handler: (t: T) => void): T
var empty = one(() => {}) // inferred as {}, expected

type Handlers<T> = { [K in keyof T]: (t: T[K]) => void }
declare function on<T>(handlerHash: Handlers<T>): T
var hashOfEmpty1 = on({ test: () => {} });  // {}
var hashOfEmpty2 = on({ test: (x: boolean) => {} });  // { test: boolean }

// Repro from #12624

interface Options1<Data, Computed> {
    data?: Data
    computed?: Computed;
}

declare class Component1<Data, Computed> {
    constructor(options: Options1<Data, Computed>);
    get<K extends keyof (Data & Computed)>(key: K): (Data & Computed)[K];
}

let c1 = new Component1({
    data: {
        hello: ""
    }
});

c1.get("hello");

// Repro from #12625

interface Options2<Data, Computed> {
    data?: Data
    computed?: Computed;
}

declare class Component2<Data, Computed> {
    constructor(options: Options2<Data, Computed>);
    get<K extends keyof Data | keyof Computed>(key: K): (Data & Computed)[K];
}

// Repro from #12641

interface R {
    p: number;
}

function f<K extends keyof R>(p: K) {
    let a: any;
    a[p].add;  // any
}

// Repro from #12651

type MethodDescriptor = {
	name: string;
	args: any[];
	returnValue: any;
}

declare function dispatchMethod<M extends MethodDescriptor>(name: M['name'], args: M['args']): M['returnValue'];

type SomeMethodDescriptor = {
	name: "someMethod";
	args: [string, number];
	returnValue: string[];
}

let result = dispatchMethod<SomeMethodDescriptor>("someMethod", ["hello", 35]);

// Repro from #13073

type KeyTypes = "a" | "b"
let MyThingy: { [key in KeyTypes]: string[] };

function addToMyThingy<S extends KeyTypes>(key: S) {
    MyThingy[key].push("a");
}

// Repro from #13102

type Handler<T> = {
    onChange: (name: keyof T) => void;
};

function onChangeGenericFunction<T>(handler: Handler<T & {preset: number}>) {
    handler.onChange('preset')
}

// Repro from #13285

function updateIds<T extends Record<K, string>, K extends string>(
    obj: T,
    idFields: K[],
    idMapping: { [oldId: string]: string }
): Record<K, string> {
    for (const idField of idFields) {
        const newId = idMapping[obj[idField]];
        if (newId) {
            obj[idField] = newId;
        }
    }
    return obj;
}

// Repro from #13285

function updateIds2<T extends { [x: string]: string }, K extends keyof T>(
    obj: T,
    key: K,
    stringMap: { [oldId: string]: string }
) {
    var x = obj[key];
    stringMap[x]; // Should be OK.
}

// Repro from #13514

declare function head<T extends Array<any>>(list: T): T[0];

// Repro from #13604

class A<T> {
	props: T & { foo: string };
}

class B extends A<{ x: number}> {
	f(p: this["props"]) {
		p.x;
	}
}

// Repro from #13749

class Form<T> {
    private childFormFactories: {[K in keyof T]: (v: T[K]) => Form<T[K]>}

    public set<K extends keyof T>(prop: K, value: T[K]) {
        this.childFormFactories[prop](value)
    }
}

// Repro from #13787

class SampleClass<P> {
    public props: Readonly<P>;
    constructor(props: P) {
        this.props = Object.freeze(props);
    }
}

interface Foo {
    foo: string;
}

declare function merge<T, U>(obj1: T, obj2: U): T & U;

class AnotherSampleClass<T> extends SampleClass<T & Foo> {
    constructor(props: T) {
        const foo: Foo = { foo: "bar" };
        super(merge(props, foo));
    }

    public brokenMethod() {
        this.props.foo.concat;
    }
}
new AnotherSampleClass({});

// Positive repro from #17166
function f3<T, K extends Extract<keyof T, string>>(t: T, k: K, tk: T[K]): void {
    for (let key in t) {
        key = k // ok, K ==> keyof T
        t[key] = tk; // ok, T[K] ==> T[keyof T]
    }
}

// # 21185
type Predicates<TaggedRecord> = {
  [T in keyof TaggedRecord]: (variant: TaggedRecord[keyof TaggedRecord]) => variant is TaggedRecord[T]
}

// Repros from #23592

type Example<T extends { [K in keyof T]: { prop: any } }> = { [K in keyof T]: T[K]["prop"] };
type Result = Example<{ a: { prop: string }; b: { prop: number } }>;

type Helper2<T> = { [K in keyof T]: Extract<T[K], { prop: any }> };
type Example2<T> = { [K in keyof Helper2<T>]: Helper2<T>[K]["prop"] };
type Result2 = Example2<{ 1: { prop: string }; 2: { prop: number } }>;

// Repro from #23618

type DBBoolTable<K extends string> = { [k in K]: 0 | 1 } 
enum Flag {
    FLAG_1 = "flag_1",
    FLAG_2 = "flag_2"
}

type SimpleDBRecord<Flag extends string> = { staticField: number } & DBBoolTable<Flag>
function getFlagsFromSimpleRecord<Flag extends string>(record: SimpleDBRecord<Flag>, flags: Flag[]) {
    return record[flags[0]];
}

type DynamicDBRecord<Flag extends string> = ({ dynamicField: number } | { dynamicField: string }) & DBBoolTable<Flag>
function getFlagsFromDynamicRecord<Flag extends string>(record: DynamicDBRecord<Flag>, flags: Flag[]) {
    return record[flags[0]];
}

// Repro from #21368

interface I {
    foo: string;
}

declare function take<T>(p: T): void;

function fn<T extends I, K extends keyof T>(o: T, k: K) {
    take<{} | null | undefined>(o[k]);
    take<any>(o[k]);
}

// Repro from #23133

class Unbounded<T> {
    foo(x: T[keyof T]) {
        let y: {} | undefined | null = x;
    }
}

// Repro from #23940

interface I7 {
    x: any;
}
type Foo7<T extends number> = T;
declare function f7<K extends keyof I7>(type: K): Foo7<I7[K]>;


//// [keyofAndIndexedAccess.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = /** @class */ (function () {
    function Shape() {
    }
    return Shape;
}());
var TaggedShape = /** @class */ (function (_super) {
    __extends(TaggedShape, _super);
    function TaggedShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TaggedShape;
}(Shape));
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
var Options = /** @class */ (function () {
    function Options() {
    }
    return Options;
}());
function getProperty(obj, key) {
    return obj[key];
}
function setProperty(obj, key, value) {
    obj[key] = value;
}
function f10(shape) {
    var name = getProperty(shape, "name"); // string
    var widthOrHeight = getProperty(shape, cond ? "width" : "height"); // number
    var nameOrVisible = getProperty(shape, cond ? "name" : "visible"); // string | boolean
    setProperty(shape, "name", "rectangle");
    setProperty(shape, cond ? "width" : "height", 10);
    setProperty(shape, cond ? "name" : "visible", true); // Technically not safe
}
function f11(a) {
    var len = getProperty(a, "length"); // number
    setProperty(a, "length", len);
}
function f12(t) {
    var len = getProperty(t, "length");
    var s2 = getProperty(t, "0"); // Shape
    var b2 = getProperty(t, "1"); // boolean
}
function f13(foo, bar) {
    var x = getProperty(foo, "x"); // any
    var y = getProperty(foo, "100"); // any
    var z = getProperty(foo, bar); // any
}
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.getProperty = function (key) {
        return this.props[key];
    };
    Component.prototype.setProperty = function (key, value) {
        this.props[key] = value;
    };
    return Component;
}());
function f20(component) {
    var name = component.getProperty("name"); // string
    var widthOrHeight = component.getProperty(cond ? "width" : "height"); // number
    var nameOrVisible = component.getProperty(cond ? "name" : "visible"); // string | boolean
    component.setProperty("name", "rectangle");
    component.setProperty(cond ? "width" : "height", 10);
    component.setProperty(cond ? "name" : "visible", true); // Technically not safe
}
function pluck(array, key) {
    return array.map(function (x) { return x[key]; });
}
function f30(shapes) {
    var names = pluck(shapes, "name"); // string[]
    var widths = pluck(shapes, "width"); // number[]
    var nameOrVisibles = pluck(shapes, cond ? "name" : "visible"); // (string | boolean)[]
}
function f31(key) {
    var shape = { name: "foo", width: 5, height: 10, visible: true };
    return shape[key]; // Shape[K]
}
function f32(key) {
    var shape = { name: "foo", width: 5, height: 10, visible: true };
    return shape[key]; // Shape[K]
}
function f33(shape, key) {
    var name = getProperty(shape, "name");
    var prop = getProperty(shape, key);
    return prop;
}
function f34(ts) {
    var tag1 = f33(ts, "tag");
    var tag2 = getProperty(ts, "tag");
}
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
// Indexed access expressions have always permitted access to private and protected members.
// For consistency we also permit such access in indexed access types.
function f40(c) {
    var x = c["x"];
    var y = c["y"];
    var z = c["z"];
}
function f50(k, s) {
    var x1 = s;
    var x2 = k;
}
function f51(k, s) {
    var x1 = s;
    var x2 = k;
}
function f52(obj, k, s, n) {
    var x1 = obj[s];
    var x2 = obj[n];
    var x3 = obj[k];
}
function f53(obj, k, s, n) {
    var x1 = obj[s];
    var x2 = obj[n];
    var x3 = obj[k];
}
function f54(obj, key) {
    for (var s in obj[key]) {
    }
    var b = "foo" in obj[key];
}
function f55(obj, key) {
    for (var s in obj[key]) {
    }
    var b = "foo" in obj[key];
}
function f60(source, target) {
    for (var k in source) {
        target[k] = source[k];
    }
}
function f70(func) {
    func('a', 'a');
    func('a', 'b');
    func('a', 'c');
}
function f71(func) {
    var x = func({ a: 1, b: "hello" }, { c: true });
    x.a; // number | undefined
    x.b; // string | undefined
    x.c; // boolean | undefined
}
function f72(func) {
    var a = func({ a: 1, b: "hello" }, { c: true }, 'a'); // number
    var b = func({ a: 1, b: "hello" }, { c: true }, 'b'); // string
    var c = func({ a: 1, b: "hello" }, { c: true }, 'c'); // boolean
}
function f73(func) {
    var a = func({ a: 1, b: "hello" }, { c: true }, 'a'); // number
    var b = func({ a: 1, b: "hello" }, { c: true }, 'b'); // string
    var c = func({ a: 1, b: "hello" }, { c: true }, 'c'); // boolean
}
function f74(func) {
    var a = func({ a: 1, b: "hello" }, { a: 2, b: true }, 'a'); // number
    var b = func({ a: 1, b: "hello" }, { a: 2, b: true }, 'b'); // string | boolean
}
function f80(obj) {
    var a1 = obj.a; // { x: any }
    var a2 = obj['a']; // { x: any }
    var a3 = obj['a']; // T["a"]
    var x1 = obj.a.x; // any
    var x2 = obj['a']['x']; // any
    var x3 = obj['a']['x']; // T["a"]["x"]
}
function f81(obj) {
    return obj['a']['x'];
}
function f82() {
    var x1 = f81({ a: { x: "hello" } }); // string
    var x2 = f81({ a: { x: 42 } }); // number
}
function f83(obj, key) {
    return obj[key]['x'];
}
function f84() {
    var x1 = f83({ foo: { x: "hello" } }, "foo"); // string
    var x2 = f83({ bar: { x: 42 } }, "bar"); // number
}
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.get = function (key) {
        return this[key];
    };
    C1.prototype.set = function (key, value) {
        this[key] = value;
    };
    C1.prototype.foo = function () {
        var x1 = this.x; // number
        var x2 = this["x"]; // number
        var x3 = this.get("x"); // this["x"]
        var x4 = getProperty(this, "x"); // this["x"]
        this.x = 42;
        this["x"] = 42;
        this.set("x", 42);
        setProperty(this, "x", 42);
    };
    return C1;
}());
function f90(x1, x2, x3, x4) {
    x1 = x2;
    x1 = x3;
    x1 = x4;
    x2 = x1;
    x2 = x3;
    x2 = x4;
    x3 = x1;
    x3 = x2;
    x3 = x4;
    x4 = x1;
    x4 = x2;
    x4 = x3;
    x1.length;
    x2.length;
    x3.length;
    x4.length;
}
function f91(x, y, z) {
    var a;
    a = x;
    a = y;
    a = z;
}
function f92(x, y, z) {
    var a;
    a = x;
    a = y;
    a = z;
}
// Repros from #12011
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.get = function (prop) {
        return this[prop];
    };
    Base.prototype.set = function (prop, value) {
        this[prop] = value;
    };
    return Base;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(parts) {
        var _this = _super.call(this) || this;
        _this.set("parts", parts);
        return _this;
    }
    Person.prototype.getParts = function () {
        return this.get("parts");
    };
    return Person;
}(Base));
var OtherPerson = /** @class */ (function () {
    function OtherPerson(parts) {
        setProperty(this, "parts", parts);
    }
    OtherPerson.prototype.getParts = function () {
        return getProperty(this, "parts");
    };
    return OtherPerson;
}());
function path(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var result = obj;
    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
        var k = keys_1[_a];
        result = result[k];
    }
    return result;
}
function f1(thing) {
    var x1 = path(thing, 'a'); // { x: number, y: string }
    var x2 = path(thing, 'a', 'y'); // string
    var x3 = path(thing, 'b'); // boolean
    var x4 = path.apply(void 0, [thing].concat(['a', 'x'])); // any
}
// Repro from comment in #12114
var assignTo2 = function (object, key1, key2) {
    return function (value) { return object[key1][key2] = value; };
};
var empty = one(function () { }); // inferred as {}, expected
var hashOfEmpty1 = on({ test: function () { } }); // {}
var hashOfEmpty2 = on({ test: function (x) { } }); // { test: boolean }
var c1 = new Component1({
    data: {
        hello: ""
    }
});
c1.get("hello");
function f(p) {
    var a;
    a[p].add; // any
}
var result = dispatchMethod("someMethod", ["hello", 35]);
var MyThingy;
function addToMyThingy(key) {
    MyThingy[key].push("a");
}
function onChangeGenericFunction(handler) {
    handler.onChange('preset');
}
// Repro from #13285
function updateIds(obj, idFields, idMapping) {
    for (var _i = 0, idFields_1 = idFields; _i < idFields_1.length; _i++) {
        var idField = idFields_1[_i];
        var newId = idMapping[obj[idField]];
        if (newId) {
            obj[idField] = newId;
        }
    }
    return obj;
}
// Repro from #13285
function updateIds2(obj, key, stringMap) {
    var x = obj[key];
    stringMap[x]; // Should be OK.
}
// Repro from #13604
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.f = function (p) {
        p.x;
    };
    return B;
}(A));
// Repro from #13749
var Form = /** @class */ (function () {
    function Form() {
    }
    Form.prototype.set = function (prop, value) {
        this.childFormFactories[prop](value);
    };
    return Form;
}());
// Repro from #13787
var SampleClass = /** @class */ (function () {
    function SampleClass(props) {
        this.props = Object.freeze(props);
    }
    return SampleClass;
}());
var AnotherSampleClass = /** @class */ (function (_super) {
    __extends(AnotherSampleClass, _super);
    function AnotherSampleClass(props) {
        var _this = this;
        var foo = { foo: "bar" };
        _this = _super.call(this, merge(props, foo)) || this;
        return _this;
    }
    AnotherSampleClass.prototype.brokenMethod = function () {
        this.props.foo.concat;
    };
    return AnotherSampleClass;
}(SampleClass));
new AnotherSampleClass({});
// Positive repro from #17166
function f3(t, k, tk) {
    for (var key in t) {
        key = k; // ok, K ==> keyof T
        t[key] = tk; // ok, T[K] ==> T[keyof T]
    }
}
var Flag;
(function (Flag) {
    Flag["FLAG_1"] = "flag_1";
    Flag["FLAG_2"] = "flag_2";
})(Flag || (Flag = {}));
function getFlagsFromSimpleRecord(record, flags) {
    return record[flags[0]];
}
function getFlagsFromDynamicRecord(record, flags) {
    return record[flags[0]];
}
function fn(o, k) {
    take(o[k]);
    take(o[k]);
}
// Repro from #23133
var Unbounded = /** @class */ (function () {
    function Unbounded() {
    }
    Unbounded.prototype.foo = function (x) {
        var y = x;
    };
    return Unbounded;
}());


//// [keyofAndIndexedAccess.d.ts]
declare class Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}
declare class TaggedShape extends Shape {
    tag: string;
}
declare class Item {
    name: string;
    price: number;
}
declare class Options {
    visible: "yes" | "no";
}
declare type Dictionary<T> = {
    [x: string]: T;
};
declare type NumericallyIndexed<T> = {
    [x: number]: T;
};
declare const enum E {
    A = 0,
    B = 1,
    C = 2
}
declare type K00 = keyof any;
declare type K01 = keyof string;
declare type K02 = keyof number;
declare type K03 = keyof boolean;
declare type K04 = keyof void;
declare type K05 = keyof undefined;
declare type K06 = keyof null;
declare type K07 = keyof never;
declare type K10 = keyof Shape;
declare type K11 = keyof Shape[];
declare type K12 = keyof Dictionary<Shape>;
declare type K13 = keyof {};
declare type K14 = keyof Object;
declare type K15 = keyof E;
declare type K16 = keyof [string, number];
declare type K17 = keyof (Shape | Item);
declare type K18 = keyof (Shape & Item);
declare type K19 = keyof NumericallyIndexed<Shape>;
declare type KeyOf<T> = keyof T;
declare type K20 = KeyOf<Shape>;
declare type K21 = KeyOf<Dictionary<Shape>>;
declare type NAME = "name";
declare type WIDTH_OR_HEIGHT = "width" | "height";
declare type Q10 = Shape["name"];
declare type Q11 = Shape["width" | "height"];
declare type Q12 = Shape["name" | "visible"];
declare type Q20 = Shape[NAME];
declare type Q21 = Shape[WIDTH_OR_HEIGHT];
declare type Q30 = [string, number][0];
declare type Q31 = [string, number][1];
declare type Q32 = [string, number][2];
declare type Q33 = [string, number][E.A];
declare type Q34 = [string, number][E.B];
declare type Q35 = [string, number][E.C];
declare type Q36 = [string, number]["0"];
declare type Q37 = [string, number]["1"];
declare type Q40 = (Shape | Options)["visible"];
declare type Q41 = (Shape & Options)["visible"];
declare type Q50 = Dictionary<Shape>["howdy"];
declare type Q51 = Dictionary<Shape>[123];
declare type Q52 = Dictionary<Shape>[E.B];
declare let cond: boolean;
declare function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
declare function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void;
declare function f10(shape: Shape): void;
declare function f11(a: Shape[]): void;
declare function f12(t: [Shape, boolean]): void;
declare function f13(foo: any, bar: any): void;
declare class Component<PropType> {
    props: PropType;
    getProperty<K extends keyof PropType>(key: K): PropType[K];
    setProperty<K extends keyof PropType>(key: K, value: PropType[K]): void;
}
declare function f20(component: Component<Shape>): void;
declare function pluck<T, K extends keyof T>(array: T[], key: K): T[K][];
declare function f30(shapes: Shape[]): void;
declare function f31<K extends keyof Shape>(key: K): Shape[K];
declare function f32<K extends "width" | "height">(key: K): Shape[K];
declare function f33<S extends Shape, K extends keyof S>(shape: S, key: K): S[K];
declare function f34(ts: TaggedShape): void;
declare class C {
    x: string;
    protected y: string;
    private z;
}
declare function f40(c: C): void;
declare function f50<T>(k: keyof T, s: string): void;
declare function f51<T, K extends keyof T>(k: K, s: string): void;
declare function f52<T>(obj: {
    [x: string]: boolean;
}, k: Exclude<keyof T, symbol>, s: string, n: number): void;
declare function f53<T, K extends Exclude<keyof T, symbol>>(obj: {
    [x: string]: boolean;
}, k: K, s: string, n: number): void;
declare function f54<T>(obj: T, key: keyof T): void;
declare function f55<T, K extends keyof T>(obj: T, key: K): void;
declare function f60<T>(source: T, target: T): void;
declare function f70(func: <T, U>(k1: keyof (T | U), k2: keyof (T & U)) => void): void;
declare function f71(func: <T, U>(x: T, y: U) => Partial<T & U>): void;
declare function f72(func: <T, U, K extends keyof T | keyof U>(x: T, y: U, k: K) => (T & U)[K]): void;
declare function f73(func: <T, U, K extends keyof (T & U)>(x: T, y: U, k: K) => (T & U)[K]): void;
declare function f74(func: <T, U, K extends keyof (T | U)>(x: T, y: U, k: K) => (T | U)[K]): void;
declare function f80<T extends {
    a: {
        x: any;
    };
}>(obj: T): void;
declare function f81<T extends {
    a: {
        x: any;
    };
}>(obj: T): T["a"]["x"];
declare function f82(): void;
declare function f83<T extends {
    [x: string]: {
        x: any;
    };
}, K extends keyof T>(obj: T, key: K): T[K]["x"];
declare function f84(): void;
declare class C1 {
    x: number;
    get<K extends keyof this>(key: K): this[K];
    set<K extends keyof this>(key: K, value: this[K]): void;
    foo(): void;
}
declare type S2 = {
    a: string;
    b: string;
};
declare function f90<T extends S2, K extends keyof S2>(x1: S2[keyof S2], x2: T[keyof S2], x3: S2[K], x4: T[K]): void;
declare function f91<T, K extends keyof T>(x: T, y: T[keyof T], z: T[K]): void;
declare function f92<T, K extends keyof T>(x: T, y: T[keyof T], z: T[K]): void;
declare class Base {
    get<K extends keyof this>(prop: K): this[K];
    set<K extends keyof this>(prop: K, value: this[K]): void;
}
declare class Person extends Base {
    parts: number;
    constructor(parts: number);
    getParts(): this["parts"];
}
declare class OtherPerson {
    parts: number;
    constructor(parts: number);
    getParts(): this["parts"];
}
declare function path<T, K1 extends keyof T>(obj: T, key1: K1): T[K1];
declare function path<T, K1 extends keyof T, K2 extends keyof T[K1]>(obj: T, key1: K1, key2: K2): T[K1][K2];
declare function path<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(obj: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3];
declare function path(obj: any, ...keys: (string | number)[]): any;
declare type Thing = {
    a: {
        x: number;
        y: string;
    };
    b: boolean;
};
declare function f1(thing: Thing): void;
declare const assignTo2: <T, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, key1: K1, key2: K2) => (value: T[K1][K2]) => T[K1][K2];
declare function one<T>(handler: (t: T) => void): T;
declare var empty: {};
declare type Handlers<T> = {
    [K in keyof T]: (t: T[K]) => void;
};
declare function on<T>(handlerHash: Handlers<T>): T;
declare var hashOfEmpty1: {
    test: {};
};
declare var hashOfEmpty2: {
    test: boolean;
};
interface Options1<Data, Computed> {
    data?: Data;
    computed?: Computed;
}
declare class Component1<Data, Computed> {
    constructor(options: Options1<Data, Computed>);
    get<K extends keyof (Data & Computed)>(key: K): (Data & Computed)[K];
}
declare let c1: Component1<{
    hello: string;
}, {}>;
interface Options2<Data, Computed> {
    data?: Data;
    computed?: Computed;
}
declare class Component2<Data, Computed> {
    constructor(options: Options2<Data, Computed>);
    get<K extends keyof Data | keyof Computed>(key: K): (Data & Computed)[K];
}
interface R {
    p: number;
}
declare function f<K extends keyof R>(p: K): void;
declare type MethodDescriptor = {
    name: string;
    args: any[];
    returnValue: any;
};
declare function dispatchMethod<M extends MethodDescriptor>(name: M['name'], args: M['args']): M['returnValue'];
declare type SomeMethodDescriptor = {
    name: "someMethod";
    args: [string, number];
    returnValue: string[];
};
declare let result: string[];
declare type KeyTypes = "a" | "b";
declare let MyThingy: {
    [key in KeyTypes]: string[];
};
declare function addToMyThingy<S extends KeyTypes>(key: S): void;
declare type Handler<T> = {
    onChange: (name: keyof T) => void;
};
declare function onChangeGenericFunction<T>(handler: Handler<T & {
    preset: number;
}>): void;
declare function updateIds<T extends Record<K, string>, K extends string>(obj: T, idFields: K[], idMapping: {
    [oldId: string]: string;
}): Record<K, string>;
declare function updateIds2<T extends {
    [x: string]: string;
}, K extends keyof T>(obj: T, key: K, stringMap: {
    [oldId: string]: string;
}): void;
declare function head<T extends Array<any>>(list: T): T[0];
declare class A<T> {
    props: T & {
        foo: string;
    };
}
declare class B extends A<{
    x: number;
}> {
    f(p: this["props"]): void;
}
declare class Form<T> {
    private childFormFactories;
    set<K extends keyof T>(prop: K, value: T[K]): void;
}
declare class SampleClass<P> {
    props: Readonly<P>;
    constructor(props: P);
}
interface Foo {
    foo: string;
}
declare function merge<T, U>(obj1: T, obj2: U): T & U;
declare class AnotherSampleClass<T> extends SampleClass<T & Foo> {
    constructor(props: T);
    brokenMethod(): void;
}
declare function f3<T, K extends Extract<keyof T, string>>(t: T, k: K, tk: T[K]): void;
declare type Predicates<TaggedRecord> = {
    [T in keyof TaggedRecord]: (variant: TaggedRecord[keyof TaggedRecord]) => variant is TaggedRecord[T];
};
declare type Example<T extends {
    [K in keyof T]: {
        prop: any;
    };
}> = {
    [K in keyof T]: T[K]["prop"];
};
declare type Result = Example<{
    a: {
        prop: string;
    };
    b: {
        prop: number;
    };
}>;
declare type Helper2<T> = {
    [K in keyof T]: Extract<T[K], {
        prop: any;
    }>;
};
declare type Example2<T> = {
    [K in keyof Helper2<T>]: Helper2<T>[K]["prop"];
};
declare type Result2 = Example2<{
    1: {
        prop: string;
    };
    2: {
        prop: number;
    };
}>;
declare type DBBoolTable<K extends string> = {
    [k in K]: 0 | 1;
};
declare enum Flag {
    FLAG_1 = "flag_1",
    FLAG_2 = "flag_2"
}
declare type SimpleDBRecord<Flag extends string> = {
    staticField: number;
} & DBBoolTable<Flag>;
declare function getFlagsFromSimpleRecord<Flag extends string>(record: SimpleDBRecord<Flag>, flags: Flag[]): SimpleDBRecord<Flag>[Flag];
declare type DynamicDBRecord<Flag extends string> = ({
    dynamicField: number;
} | {
    dynamicField: string;
}) & DBBoolTable<Flag>;
declare function getFlagsFromDynamicRecord<Flag extends string>(record: DynamicDBRecord<Flag>, flags: Flag[]): DynamicDBRecord<Flag>[Flag];
interface I {
    foo: string;
}
declare function take<T>(p: T): void;
declare function fn<T extends I, K extends keyof T>(o: T, k: K): void;
declare class Unbounded<T> {
    foo(x: T[keyof T]): void;
}
interface I7 {
    x: any;
}
declare type Foo7<T extends number> = T;
declare function f7<K extends keyof I7>(type: K): Foo7<I7[K]>;
