//// [controlFlowGenericTypes.ts]
function f1<T extends string | undefined>(x: T, y: { a: T }, z: [T]): string {
    if (x) {
        x;
        x.length;
        return x;
    }
    if (y.a) {
        y.a.length;
        return y.a;
    }
    if (z[0]) {
        z[0].length;
        return z[0];
    }
    return "hello";
}

function f2<T>(x: Extract<T, string | undefined> | null): string {
    if (x) {
        x;
        x.length;
        return x;
    }
    return "hello";
}

interface Box<T> {
    item: T;
}

declare function isBox(x: any): x is Box<unknown>;
declare function isUndefined(x: unknown): x is undefined;
declare function unbox<T>(x: Box<T>): T;

function g1<T extends Box<T> | undefined>(x: T) {
    if (isBox(x)) {
        unbox(x);
    }
}

function g2<T extends Box<T> | undefined>(x: T) {
    if (!isUndefined(x)) {
        unbox(x);
    }
}

function g3<T extends Box<T> | undefined>(x: T) {
    if (!isBox(x)) {
        unbox(x);  // Error
    }
}

function g4<T extends Box<T> | undefined>(x: T) {
    if (isUndefined(x)) {
        unbox(x);  // Error
    }
}

// Repro from #13995

declare function takeA(val: 'A'): void;
export function bounceAndTakeIfA<AB extends 'A' | 'B'>(value: AB): AB {
    if (value === 'A') {
        takeA(value);
        return value;
    }
    else {
        return value;
    }
}

// Repro from #13995

type Common = { id: number };
type AA = { tag: 'A', id: number };
type BB = { tag: 'B', id: number, foo: number };

type MyUnion = AA | BB;

const fn = (value: MyUnion) => {
    value.foo;  // Error
    if ('foo' in value) {
        value.foo;
    }
    if (value.tag === 'B') {
        value.foo;
    }
};

const fn2 = <T extends MyUnion>(value: T): MyUnion => {
    value.foo;  // Error
    if ('foo' in value) {
        value.foo;
    }
    if (value.tag === 'B') {
        value.foo;
    }
};

// Repro from #13995

type A1 = {
    testable: true
    doTest: () => void
}
type B1 = {
    testable: false
};

type Union = A1 | B1

function notWorking<T extends Union>(object: T) {
    if (!object.testable) return;
    object.doTest();
}

// Repro from #42939

interface A {
    a: number | null;
};

function get<K extends keyof A>(key: K, obj: A): number {
    const value = obj[key];
    if (value !== null) {
        return value;
    }
    return 0;
};

// Repro from #44093

class EventEmitter<ET> {
    off<K extends keyof ET>(...args: [K, number] | [unknown, string]):void {}
}
function once<ET, T extends EventEmitter<ET>>(emittingObject: T, eventName: keyof ET): void {
    emittingObject.off(eventName, 0);
    emittingObject.off(eventName as typeof eventName, 0);
}

// In an element access obj[x], we consider obj to be in a constraint position, except when obj is of
// a generic type without a nullable constraint and x is a generic type. This is because when both obj
// and x are of generic types T and K, we want the resulting type to be T[K].

function fx1<T, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
}

function fx2<T extends Record<keyof T, string>, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
}

function fx3<T extends Record<keyof T, string> | undefined, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];  // Error
    const x2 = obj && obj[key];
}

// Repro from #44166

class TableBaseEnum<
    PublicSpec extends Record<keyof InternalSpec, any>,
    InternalSpec extends Record<keyof PublicSpec, any>  | undefined = undefined> {
    m() {
        let iSpec = null! as InternalSpec;
        iSpec[null! as keyof InternalSpec];  // Error, object possibly undefined
        iSpec[null! as keyof PublicSpec];    // Error, object possibly undefined
        if (iSpec === undefined) {
            return;
        }
        iSpec[null! as keyof InternalSpec];
        iSpec[null! as keyof PublicSpec];
    }
}

// Repros from #45145

function f10<T extends { a: string } | undefined>(x: T, y: Partial<T>) {
    y = x;
}

type SqlInsertSet<T> = T extends undefined ? object : { [P in keyof T]: unknown };

class SqlTable<T> {
    protected validateRow(_row: Partial<SqlInsertSet<T>>): void {
    }
    public insertRow(row: SqlInsertSet<T>) {
        this.validateRow(row);
    }
}

// Repro from #46495

interface Button {
    type: "button";
    text: string;
}

interface Checkbox {
    type: "checkbox";
    isChecked: boolean;
}

type Control = Button | Checkbox;

function update<T extends Control, K extends keyof T>(control : T | undefined, key: K, value: T[K]): void {
    if (control !== undefined) {
        control[key] = value;
    }
}


//// [controlFlowGenericTypes.js]
"use strict";
exports.__esModule = true;
exports.bounceAndTakeIfA = void 0;
function f1(x, y, z) {
    if (x) {
        x;
        x.length;
        return x;
    }
    if (y.a) {
        y.a.length;
        return y.a;
    }
    if (z[0]) {
        z[0].length;
        return z[0];
    }
    return "hello";
}
function f2(x) {
    if (x) {
        x;
        x.length;
        return x;
    }
    return "hello";
}
function g1(x) {
    if (isBox(x)) {
        unbox(x);
    }
}
function g2(x) {
    if (!isUndefined(x)) {
        unbox(x);
    }
}
function g3(x) {
    if (!isBox(x)) {
        unbox(x); // Error
    }
}
function g4(x) {
    if (isUndefined(x)) {
        unbox(x); // Error
    }
}
function bounceAndTakeIfA(value) {
    if (value === 'A') {
        takeA(value);
        return value;
    }
    else {
        return value;
    }
}
exports.bounceAndTakeIfA = bounceAndTakeIfA;
var fn = function (value) {
    value.foo; // Error
    if ('foo' in value) {
        value.foo;
    }
    if (value.tag === 'B') {
        value.foo;
    }
};
var fn2 = function (value) {
    value.foo; // Error
    if ('foo' in value) {
        value.foo;
    }
    if (value.tag === 'B') {
        value.foo;
    }
};
function notWorking(object) {
    if (!object.testable)
        return;
    object.doTest();
}
;
function get(key, obj) {
    var value = obj[key];
    if (value !== null) {
        return value;
    }
    return 0;
}
;
// Repro from #44093
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
    }
    EventEmitter.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return EventEmitter;
}());
function once(emittingObject, eventName) {
    emittingObject.off(eventName, 0);
    emittingObject.off(eventName, 0);
}
// In an element access obj[x], we consider obj to be in a constraint position, except when obj is of
// a generic type without a nullable constraint and x is a generic type. This is because when both obj
// and x are of generic types T and K, we want the resulting type to be T[K].
function fx1(obj, key) {
    var x1 = obj[key];
    var x2 = obj && obj[key];
}
function fx2(obj, key) {
    var x1 = obj[key];
    var x2 = obj && obj[key];
}
function fx3(obj, key) {
    var x1 = obj[key]; // Error
    var x2 = obj && obj[key];
}
// Repro from #44166
var TableBaseEnum = /** @class */ (function () {
    function TableBaseEnum() {
    }
    TableBaseEnum.prototype.m = function () {
        var iSpec = null;
        iSpec[null]; // Error, object possibly undefined
        iSpec[null]; // Error, object possibly undefined
        if (iSpec === undefined) {
            return;
        }
        iSpec[null];
        iSpec[null];
    };
    return TableBaseEnum;
}());
// Repros from #45145
function f10(x, y) {
    y = x;
}
var SqlTable = /** @class */ (function () {
    function SqlTable() {
    }
    SqlTable.prototype.validateRow = function (_row) {
    };
    SqlTable.prototype.insertRow = function (row) {
        this.validateRow(row);
    };
    return SqlTable;
}());
function update(control, key, value) {
    if (control !== undefined) {
        control[key] = value;
    }
}
