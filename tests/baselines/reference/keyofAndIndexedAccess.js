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

const enum E { A, B, C }

type K00 = keyof any;  // string | number
type K01 = keyof string;  // number | "toString" | "charAt" | ...
type K02 = keyof number;  // "toString" | "toFixed" | "toExponential" | ...
type K03 = keyof boolean;  // "valueOf"
type K04 = keyof void;  // never
type K05 = keyof undefined;  // never
type K06 = keyof null;  // never
type K07 = keyof never;  // never

type K10 = keyof Shape;  // "name" | "width" | "height" | "visible"
type K11 = keyof Shape[];  // number | "length" | "toString" | ...
type K12 = keyof Dictionary<Shape>;  // string | number
type K13 = keyof {};  // never
type K14 = keyof Object;  // "constructor" | "toString" | ...
type K15 = keyof E;  // "toString" | "toFixed" | "toExponential" | ...
type K16 = keyof [string, number];  // number | "0" | "1" | "length" | "toString" | ...
type K17 = keyof (Shape | Item);  // "name"
type K18 = keyof (Shape & Item);  // "name" | "width" | "height" | "visible" | "price"

type KeyOf<T> = keyof T;

type K20 = KeyOf<Shape>;  // "name" | "width" | "height" | "visible"
type K21 = KeyOf<Dictionary<Shape>>;  // string | number

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

function f52<T>(obj: { [x: string]: boolean }, k: keyof T, s: string, n: number) {
    const x1 = obj[s];
    const x2 = obj[n];
    const x3 = obj[k];
}

function f53<T, K extends keyof T>(obj: { [x: string]: boolean }, k: K, s: string, n: number) {
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

//// [keyofAndIndexedAccess.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
var TaggedShape = (function (_super) {
    __extends(TaggedShape, _super);
    function TaggedShape() {
        return _super.apply(this, arguments) || this;
    }
    return TaggedShape;
}(Shape));
var Item = (function () {
    function Item() {
    }
    return Item;
}());
var Options = (function () {
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
var Component = (function () {
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
var C = (function () {
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
// Repros from #12011
var Base = (function () {
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
var Person = (function (_super) {
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
var OtherPerson = (function () {
    function OtherPerson(parts) {
        setProperty(this, "parts", parts);
    }
    OtherPerson.prototype.getParts = function () {
        return getProperty(this, "parts");
    };
    return OtherPerson;
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
declare const enum E {
    A = 0,
    B = 1,
    C = 2,
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
}, k: keyof T, s: string, n: number): void;
declare function f53<T, K extends keyof T>(obj: {
    [x: string]: boolean;
}, k: K, s: string, n: number): void;
declare function f54<T>(obj: T, key: keyof T): void;
declare function f55<T, K extends keyof T>(obj: T, key: K): void;
declare function f60<T>(source: T, target: T): void;
declare class Base {
    get<K extends keyof this>(prop: K): this[K];
    set<K extends keyof this>(prop: K, value: this[K]): void;
}
declare class Person extends Base {
    parts: number;
    constructor(parts: number);
    getParts(): number;
}
declare class OtherPerson {
    parts: number;
    constructor(parts: number);
    getParts(): number;
}
