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
declare type Props = {
    foo: string;
    bar: string;
};
declare type InputProps = {
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
