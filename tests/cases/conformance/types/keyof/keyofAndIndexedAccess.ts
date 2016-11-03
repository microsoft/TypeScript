// @declaration: true

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