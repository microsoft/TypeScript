// @noEmit: true
// @strict: true

type Ret<T extends boolean> =
    T extends true ? 1 :
    T extends false ? 2 :
    never;

// Tests for constructing narrowable reference.

function f1<T extends boolean>(param: T): Ret<T> {
    return param ? 1 : 2;
}

function f2<T extends boolean>(param: { prop: T }): Ret<T> {
    return param.prop ? 1 : 2;
}

function f3<T extends boolean>({ prop }: { prop: T }): Ret<T> {
    return prop ? 1 : 2;
}

function f4<T extends boolean>({ prop1 }: { prop1: { prop2: T } }): Ret<T> {
    return prop1.prop2 ? 1 : 2;
}

function f5<T extends boolean>(param: { prop1: { prop2: T } }): Ret<T> {
    return param.prop1.prop2 ? 1 : 2;
}

function f6<T extends boolean>({ prop1: { prop2: a } }: { prop1: { prop2: T } }): Ret<T> {
    return a ? 1 : 2;
}

function f7<T extends boolean>({ prop1: { prop2 } }: { prop1: { prop2: T } }): Ret<T> {
    return prop2 ? 1 : 2;
}

function f8<T extends boolean>({ prop1 }: T): Ret<T> { // Bad.
    return prop1 ? 1 : 2;
}

function f9<T extends boolean>(param: { "some prop": T }): Ret<T> {
    return param["some prop"] ? 1 : 2;
}

// Tests for detection of valid narrowable type parameter references.

function g1<T extends boolean>(param: T): Ret<T> {
    return param ? 1 : 2;
}

function g2<T extends boolean>(param: { prop: T }): Ret<T> {
    return param.prop ? 1 : 2;
}

class Dog {
    bark(): void {}
}

class Cat {
    meow(): void {}

}

type Type1<T> = { prop: T, prop2: Cat | Dog }

function g3<T extends boolean>(param: Type1<T>): Ret<T> {
    return param.prop ? 1 : 2;
}

type TypeUnused<T> = string;

function g4<T extends boolean>(param: Type1<T>, other: TypeUnused<T>): Ret<T> { // Bad.
    return param.prop ? 1 : 2;
}

interface Type2<T extends boolean> {
    prop: T,
    [s: string]: boolean | undefined,
}

function g5<T extends boolean>(param: Type2<T>): Ret<T> {
    return param.prop ? 1 : 2;
}

interface Type3<T extends boolean> {
    prop: T,
}

interface Type3<T extends boolean> {
    prop2: Cat | Dog,
}

function g6<T extends boolean>(param: Type3<T>): Ret<T> { // Unsupported for now: interface merging.
    return param.prop ? 1 : 2;
}

type Type4<T, S> = {
    prop: T,
    prop2: S[],
}

function g7<T extends boolean, S>(param: Type4<T, S>): Ret<T> {
    return param.prop ? 1 : 2;
}

function g8<T extends boolean>(param: Type1<T> & { prop2: Cat | Dog }): Ret<T> {
    return param.prop ? 1 : 2;
}

function g9<T extends boolean>([ prop ]: [T]): Ret<T> { // Unsupported.
    return prop ? 1 : 2;
}

function g10<T extends boolean>(param: [T]): Ret<T> { // Unsupported.
    return param[0] ? 1 : 2;
}

function g11<T extends boolean>(param: T[]): Ret<T> { // Bad.
    return param[0] ? 1 : 2;
}

type Type5<S> = {
    prop: S,
    prop2: string[],
}

function g12<T extends boolean>(param: Type5<T>): Ret<T> {
    return param.prop ? 1 : 2;
}

type Type6<S> = {
    prop: S,
    prop2: S[],
}

function g13<T extends boolean>(param: Type6<T>): Ret<T> { // Bad.
    return param.prop ? 1 : 2;
}

type Type7<T> = {
    [Key in "prop"]: T
}

function g14<T extends boolean>(param: Type7<T>): Ret<T> { // Unsupported.
    return param.prop ? 1 : 2;
}

class Class1<T> {
    prop!: T;
}

function g15<T extends boolean>(param: Class1<T>): Ret<T> { // Unsupported.
    return param.prop ? 1 : 2;
}

type Type8<T> = {
    prop: T,
}

type Type9<T> = {
    prop2: T,
}

function g16<T extends boolean>(param: Type8<Type9<T>["prop2"]>): Ret<T> { // Unsupported.
    return param.prop ? 1 : 2;
}

// Tests for shadowing and resolving the constructed narrowable reference.

function h1<T extends boolean>(param: T): Ret<T> {
    if (param) {
        const param = false;
        return 1;
    }
    return 2;
}

function h2<T extends boolean>({ prop }: { prop: T}): Ret<T> {
    if (prop) {
        const prop = false;
        return 1;
    }
    return 2;
}

function h3<T extends boolean>(param: { prop: T}): Ret<T> {
    if (param.prop) {
        const param = { prop: false };
        return 1;
    }
    return 2;
}

function h4<T extends boolean>(param: { "some prop": T }): Ret<T> {
    if (param["some prop"]) {
        const param = { "some prop": false };
        return 1;
    }
    return 2;
}

function h5<T extends boolean>(param: T): Ret<T> {
    {
        const param = true;
        if (param) {
            return 1; // Bad.
        }
        return 2;
    }
}

// Tests for optionality of parameters and properties.

type RetU<T> =
    T extends true  ? 1 :
    T extends false ? 2 :
    T extends undefined ? 3 :
    never;

function fn1<T extends boolean>(param?: T): RetU<T> { // Bad.
    if (param == undefined) {
        return 3;
    }
    if (param) {
        return 1;
    }
    return 2;
}

function fn2<T extends boolean | undefined>(param?: T): RetU<T> {
    if (param == undefined) {
        return 3;
    }
    if (param) {
        return 1;
    }
    return 2;
}

function fn3<T extends boolean | undefined>(param: { prop?: T }): RetU<T> {
    if (param.prop == undefined) {
        return 3;
    }
    if (param.prop) {
        return 1;
    }
    return 2;
}

function fn4<T extends boolean | undefined>({ prop }: { prop?: T }): RetU<T> {
    if (prop == undefined) {
        return 3;
    }
    if (prop) {
        return 1;
    }
    return 2;
}

function fn5<T extends boolean | undefined>(param?: { prop: T }): RetU<T> { // Bad.
    if (param.prop == undefined) {
        return 3;
    }
    if (param.prop) {
        return 1;
    }
    return 2;
}

function fn6<T extends boolean | undefined>(param: { prop1?: { prop?: T } }): RetU<T> { // Bad.
    if (param.prop1.prop == undefined) {
        return 3;
    }
    if (param.prop1.prop) {
        return 1;
    }
    return 2;
}