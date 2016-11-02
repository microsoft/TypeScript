//// [keyofAndIndexedAccess.ts]

class Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
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
    let shape = getProperty(a, 1000);    // Shape
    setProperty(a, 1000, getProperty(a, 1001));
}

function f12(t: [Shape, boolean]) {
    let len = getProperty(t, "length");
    let s1 = getProperty(t, 0);    // Shape
    let s2 = getProperty(t, "0");  // Shape
    let b1 = getProperty(t, 1);    // boolean
    let b2 = getProperty(t, "1");  // boolean
    let x1 = getProperty(t, 2);    // Shape | boolean
}

function f13(foo: any, bar: any) {
    let x = getProperty(foo, "x");  // any
    let y = getProperty(foo, 100);  // any
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

//// [keyofAndIndexedAccess.js]
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
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
    var shape = getProperty(a, 1000); // Shape
    setProperty(a, 1000, getProperty(a, 1001));
}
function f12(t) {
    var len = getProperty(t, "length");
    var s1 = getProperty(t, 0); // Shape
    var s2 = getProperty(t, "0"); // Shape
    var b1 = getProperty(t, 1); // boolean
    var b2 = getProperty(t, "1"); // boolean
    var x1 = getProperty(t, 2); // Shape | boolean
}
function f13(foo, bar) {
    var x = getProperty(foo, "x"); // any
    var y = getProperty(foo, 100); // any
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


//// [keyofAndIndexedAccess.d.ts]
declare class Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
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
declare class C {
    x: string;
    protected y: string;
    private z;
}
declare function f40(c: C): void;
