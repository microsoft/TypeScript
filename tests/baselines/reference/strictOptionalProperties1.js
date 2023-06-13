//// [tests/cases/compiler/strictOptionalProperties1.ts] ////

//// [strictOptionalProperties1.ts]
function f1(obj: { a?: string, b?: string | undefined }) {
    let a = obj.a;  // string | undefined
    let b = obj.b;  // string | undefined
    obj.a = 'hello';
    obj.b = 'hello';
    obj.a = undefined;  // Error
    obj.b = undefined;
}

function f2(obj: { a?: string, b?: string | undefined }) {
    obj = obj;
    obj.a = obj.a;  // Error
    obj.b = obj.b;
    if ('a' in obj) {
        obj.a;
        obj.a = obj.a;
    }
    else {
        obj.a;
        obj.a = obj.a;  // Error
    }
    if (obj.hasOwnProperty('a')) {
        obj.a;
        obj.a = obj.a;
    }
    else {
        obj.a;
        obj.a = obj.a;  // Error
    }
    if ('b' in obj) {
        obj.b;
        obj.b = obj.b;
    }
    else {
        obj.b;
        obj.b = obj.b;
    }
    if (obj.hasOwnProperty('b')) {
        obj.b;
        obj.b = obj.b;
    }
    else {
        obj.b;
        obj.b = obj.b;
    }
}

function f3(obj: Partial<{ a: string, b: string | undefined }>) {
    let a = obj.a;  // string | undefined
    let b = obj.b;  // string | undefined
    obj.a = 'hello';
    obj.b = 'hello';
    obj.a = undefined;  // Error
    obj.b = undefined;
}

function f4(t: [string?]) {
    let x = t[0];  // string | undefined
    t[0] = 'hello';
    t[0] = undefined;  // Error
}

function f4a(t1: [number, string?], t2: [number, string?, string?]) {
    t1 = t2;  // Wasn't an error, but should be
}

function f5(t: [number, string?, boolean?]) {
    t = [42];
    t = [42, 'abc'];
    t = [42, 'abc', true];
    t = [42, ,];
    t = [42, , ,];
    t = [42, , , ,];  // Error
    t = [, , true];  // Error
    t = [42, undefined, true];  // Error
}

function f6() {
    const t1 = [1, 2] as const;
    const t2 = [1, 2, ,] as const;
    const t3 = [1, 2, , ,] as const;
    const t4 = [1, , 2] as const;
    const t5 = [1, , , 2] as const;
}

// Example from #13195

type Props = {
    foo: string;
    bar: string
}

type InputProps = {
    foo?: string;
    bar: string;
}

const defaultProps: Pick<Props, 'foo'> = { foo: 'foo' };
const inputProps: InputProps = { foo: undefined, bar: 'bar' };
const completeProps: Props = { ...defaultProps, ...inputProps };

// Example from #13195

const t1: [number, string?, boolean?] = [1];
const t2: [number, string?, boolean?] = [1, undefined];
const t3: [number, string?, boolean?] = [1, "string", undefined];
const t4: [number, string?, boolean?] = [1, undefined, undefined];

// Example from #13195

const x: { foo?: number } = { foo: undefined };
const y: { foo: number } = { foo: 123, ...x };

// Index signatures and strict optional properties

interface Test {
    [key: string]: string;
    foo?: string;  // Should be ok
    bar?: string | undefined;  // Error
}

// Strict optional properties and inference

declare let ox1: { p: string };
declare let ox2: { p: string | undefined };
declare let ox3: { p?: string };
declare let ox4: { p?: string | undefined };

declare let tx1: [string];
declare let tx2: [string | undefined];
declare let tx3: [string?];
declare let tx4: [(string | undefined)?];

declare function f11<T>(x: { p?: T }): T;

f11(ox1);  // string
f11(ox2);  // string | undefined
f11(ox3);  // string
f11(ox4);  // string | undefined

declare function f12<T>(x: [T?]): T;

f12(tx1);  // string
f12(tx2);  // string | undefined
f12(tx3);  // string
f12(tx4);  // string | undefined

declare function f13<T>(x: Partial<T>): T;

f13(ox1);  // { p: string }
f13(ox2);  // { p: string | undefined }
f13(ox3);  // { p: string }
f13(ox4);  // { p: string | undefined }

f13(tx1);  // [string]
f13(tx2);  // [string | undefined]
f13(tx3);  // [string]
f13(tx4);  // [string | undefined]

// Repro from #44388

type Undefinable<T> = T | undefined;

function expectNotUndefined<T>(value: Undefinable<T>): T {
    if (value === undefined) {
        throw new TypeError('value is undefined');
    }
    return value;
}

interface Bar {
    bar?: number;
}

function aa(input: Bar): void {
    const notUndefinedVal = expectNotUndefined(input.bar);
    bb(notUndefinedVal);
}

declare function bb(input: number): void;

interface U1 {
    name: string
    email?: string | number | undefined
}
interface U2 {
    name: string
    email?: string | number
}
declare const e: string | boolean | undefined
declare const u1: U1
declare let u2: U2
u1.email = e // error, but only because boolean isn't in email's type
u2.email = e // error, and suggest adding undefined
u2 = {
    name: 'hi',
    email: undefined
}

// Repro from #44437

declare var a: {[x: string]: number | string }
declare var b: {a: number, b: string}
declare var c: {a: number, b?: string}
declare var d: {a: number, b: string | undefined }
declare var e: {a: number, b?: string | undefined }

a = b;
a = c;
a = d;  // Error
a = e;  // Error

// Repro from #46004

interface PropsFromReact {
    onClick?: () => void;
}

interface PropsFromMaterialUI {
    onClick?: (() => void) | undefined;
}

type TheTypeFromMaterialUI = PropsFromReact & PropsFromMaterialUI;

interface NavBottomListItem extends TheTypeFromMaterialUI {
    value: string;
}

// Repro from #46004

type UA = undefined;  // Explicit undefined type
type UB = { x?: never }['x'];  // undefined from missing property

type UC = UA & UB;  // undefined


//// [strictOptionalProperties1.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function f1(obj) {
    var a = obj.a; // string | undefined
    var b = obj.b; // string | undefined
    obj.a = 'hello';
    obj.b = 'hello';
    obj.a = undefined; // Error
    obj.b = undefined;
}
function f2(obj) {
    obj = obj;
    obj.a = obj.a; // Error
    obj.b = obj.b;
    if ('a' in obj) {
        obj.a;
        obj.a = obj.a;
    }
    else {
        obj.a;
        obj.a = obj.a; // Error
    }
    if (obj.hasOwnProperty('a')) {
        obj.a;
        obj.a = obj.a;
    }
    else {
        obj.a;
        obj.a = obj.a; // Error
    }
    if ('b' in obj) {
        obj.b;
        obj.b = obj.b;
    }
    else {
        obj.b;
        obj.b = obj.b;
    }
    if (obj.hasOwnProperty('b')) {
        obj.b;
        obj.b = obj.b;
    }
    else {
        obj.b;
        obj.b = obj.b;
    }
}
function f3(obj) {
    var a = obj.a; // string | undefined
    var b = obj.b; // string | undefined
    obj.a = 'hello';
    obj.b = 'hello';
    obj.a = undefined; // Error
    obj.b = undefined;
}
function f4(t) {
    var x = t[0]; // string | undefined
    t[0] = 'hello';
    t[0] = undefined; // Error
}
function f4a(t1, t2) {
    t1 = t2; // Wasn't an error, but should be
}
function f5(t) {
    t = [42];
    t = [42, 'abc'];
    t = [42, 'abc', true];
    t = [42, ,];
    t = [42, , ,];
    t = [42, , , ,]; // Error
    t = [, , true]; // Error
    t = [42, undefined, true]; // Error
}
function f6() {
    var t1 = [1, 2];
    var t2 = [1, 2, ,];
    var t3 = [1, 2, , ,];
    var t4 = [1, , 2];
    var t5 = [1, , , 2];
}
var defaultProps = { foo: 'foo' };
var inputProps = { foo: undefined, bar: 'bar' };
var completeProps = __assign(__assign({}, defaultProps), inputProps);
// Example from #13195
var t1 = [1];
var t2 = [1, undefined];
var t3 = [1, "string", undefined];
var t4 = [1, undefined, undefined];
// Example from #13195
var x = { foo: undefined };
var y = __assign({ foo: 123 }, x);
f11(ox1); // string
f11(ox2); // string | undefined
f11(ox3); // string
f11(ox4); // string | undefined
f12(tx1); // string
f12(tx2); // string | undefined
f12(tx3); // string
f12(tx4); // string | undefined
f13(ox1); // { p: string }
f13(ox2); // { p: string | undefined }
f13(ox3); // { p: string }
f13(ox4); // { p: string | undefined }
f13(tx1); // [string]
f13(tx2); // [string | undefined]
f13(tx3); // [string]
f13(tx4); // [string | undefined]
function expectNotUndefined(value) {
    if (value === undefined) {
        throw new TypeError('value is undefined');
    }
    return value;
}
function aa(input) {
    var notUndefinedVal = expectNotUndefined(input.bar);
    bb(notUndefinedVal);
}
u1.email = e; // error, but only because boolean isn't in email's type
u2.email = e; // error, and suggest adding undefined
u2 = {
    name: 'hi',
    email: undefined
};
a = b;
a = c;
a = d; // Error
a = e; // Error


//// [strictOptionalProperties1.d.ts]
declare function f1(obj: {
    a?: string;
    b?: string | undefined;
}): void;
declare function f2(obj: {
    a?: string;
    b?: string | undefined;
}): void;
declare function f3(obj: Partial<{
    a: string;
    b: string | undefined;
}>): void;
declare function f4(t: [string?]): void;
declare function f4a(t1: [number, string?], t2: [number, string?, string?]): void;
declare function f5(t: [number, string?, boolean?]): void;
declare function f6(): void;
type Props = {
    foo: string;
    bar: string;
};
type InputProps = {
    foo?: string;
    bar: string;
};
declare const defaultProps: Pick<Props, 'foo'>;
declare const inputProps: InputProps;
declare const completeProps: Props;
declare const t1: [number, string?, boolean?];
declare const t2: [number, string?, boolean?];
declare const t3: [number, string?, boolean?];
declare const t4: [number, string?, boolean?];
declare const x: {
    foo?: number;
};
declare const y: {
    foo: number;
};
interface Test {
    [key: string]: string;
    foo?: string;
    bar?: string | undefined;
}
declare let ox1: {
    p: string;
};
declare let ox2: {
    p: string | undefined;
};
declare let ox3: {
    p?: string;
};
declare let ox4: {
    p?: string | undefined;
};
declare let tx1: [string];
declare let tx2: [string | undefined];
declare let tx3: [string?];
declare let tx4: [(string | undefined)?];
declare function f11<T>(x: {
    p?: T;
}): T;
declare function f12<T>(x: [T?]): T;
declare function f13<T>(x: Partial<T>): T;
type Undefinable<T> = T | undefined;
declare function expectNotUndefined<T>(value: Undefinable<T>): T;
interface Bar {
    bar?: number;
}
declare function aa(input: Bar): void;
declare function bb(input: number): void;
interface U1 {
    name: string;
    email?: string | number | undefined;
}
interface U2 {
    name: string;
    email?: string | number;
}
declare const e: string | boolean | undefined;
declare const u1: U1;
declare let u2: U2;
declare var a: {
    [x: string]: number | string;
};
declare var b: {
    a: number;
    b: string;
};
declare var c: {
    a: number;
    b?: string;
};
declare var d: {
    a: number;
    b: string | undefined;
};
declare var e: {
    a: number;
    b?: string | undefined;
};
interface PropsFromReact {
    onClick?: () => void;
}
interface PropsFromMaterialUI {
    onClick?: (() => void) | undefined;
}
type TheTypeFromMaterialUI = PropsFromReact & PropsFromMaterialUI;
interface NavBottomListItem extends TheTypeFromMaterialUI {
    value: string;
}
type UA = undefined;
type UB = {
    x?: never;
}['x'];
type UC = UA & UB;
