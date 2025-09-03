//// [tests/cases/conformance/controlFlow/controlFlowAliasing.ts] ////

//// [controlFlowAliasing.ts]
// Narrowing by aliased conditional expressions

function f10(x: string | number) {
    const isString = typeof x === "string";
    if (isString) {
        let t: string = x;
    }
    else {
        let t: number = x;
    }
}

function f11(x: unknown) {
    const isString = typeof x === "string";
    if (isString) {
        let t: string = x;
    }
}

function f12(x: string | number | boolean) {
    const isString = typeof x === "string";
    const isNumber = typeof x === "number";
    if (isString || isNumber) {
        let t: string | number = x;
    }
    else {
        let t: boolean = x;
    }
}

function f13(x: string | number | boolean) {
    const isString = typeof x === "string";
    const isNumber = typeof x === "number";
    const isStringOrNumber = isString || isNumber;
    if (isStringOrNumber) {
        let t: string | number = x;
    }
    else {
        let t: boolean = x;
    }
}

function f14(x: number | null | undefined): number | null {
    const notUndefined = x !== undefined;
    return notUndefined ? x : 0;
}

function f15(obj: { readonly x: string | number }) {
    const isString = typeof obj.x === 'string';
    if (isString) {
        let s: string = obj.x;
    }
}

function f16(obj: { readonly x: string | number }) {
    const isString = typeof obj.x === 'string';
    obj = { x: 42 };
    if (isString) {
        let s: string = obj.x;  // Not narrowed because of is assigned in function body
    }
}

function f17(obj: readonly [string | number]) {
    const isString = typeof obj[0] === 'string';
    if (isString) {
        let s: string = obj[0];
    }
}

function f18(obj: readonly [string | number]) {
    const isString = typeof obj[0] === 'string';
    obj = [42];
    if (isString) {
        let s: string = obj[0];  // Not narrowed because of is assigned in function body
    }
}

function f20(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}

function f21(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const isFoo: boolean = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;  // Not narrowed because isFoo has type annotation
    }
    else {
        obj.bar;  // Not narrowed because isFoo has type annotation
    }
}

function f22(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    let isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;  // Not narrowed because isFoo is mutable
    }
    else {
        obj.bar;  // Not narrowed because isFoo is mutable
    }
}

function f23(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo;  // Not narrowed because obj is assigned in function body
    }
    else {
        obj.bar;  // Not narrowed because obj is assigned in function body
    }
}

function f24(arg: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const obj = arg;
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}

function f25(arg: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    let obj = arg;
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}

function f26(outer: { readonly obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number } }) {
    const isFoo = outer.obj.kind === 'foo';
    if (isFoo) {
        outer.obj.foo;
    }
    else {
        outer.obj.bar;
    }
}

function f27(outer: { obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number } }) {
    const isFoo = outer.obj.kind === 'foo';
    if (isFoo) {
        outer.obj.foo;  // Not narrowed because obj is mutable
    }
    else {
        outer.obj.bar;  // Not narrowed because obj is mutable
    }
}

function f28(obj?: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const isFoo = obj && obj.kind === 'foo';
    const isBar = obj && obj.kind === 'bar';
    if (isFoo) {
        obj.foo;
    }
    if (isBar) {
        obj.bar;
    }
}

// Narrowing by aliased discriminant property access

function f30(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const kind = obj.kind;
    if (kind === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}

function f31(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const { kind } = obj;
    if (kind === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}

function f32(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const { kind: k } = obj;
    if (k === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}

function f33(obj: { kind: 'foo', foo: string } | { kind: 'bar', bar: number }) {
    const { kind } = obj;
    switch (kind) {
        case 'foo': obj.foo; break;
        case 'bar': obj.bar; break;
    }
}


class C10 {
    constructor(readonly x: string | number) {
        const thisX_isString = typeof this.x === 'string';
        const xIsString = typeof x === 'string';
        if (thisX_isString && xIsString) {
            let s: string;
            s = this.x;
            s = x;
        }
    }
}

class C11 {
    constructor(readonly x: string | number) {
        const thisX_isString = typeof this.x === 'string';
        const xIsString = typeof x === 'string';
        if (thisX_isString && xIsString) {
            // Some narrowings may be invalidated due to later assignments.
            let s: string;
            s = this.x;
            s = x;
        }
        else {
            this.x = 10;
            x = 10;
        }
    }
}

// Mixing of aliased discriminants and conditionals

function f40(obj: { kind: 'foo', foo?: string } | { kind: 'bar', bar?: number }) {
    const { kind } = obj;
    const isFoo = kind == 'foo';
    if (isFoo && obj.foo) {
        let t: string = obj.foo;
    }
}

// Unsupported narrowing of destructured payload by destructured discriminant

type Data = { kind: 'str', payload: string } | { kind: 'num', payload: number };

function gg2(obj: Data) {
    if (obj.kind === 'str') {
        let t: string = obj.payload;
    }
    else {
        let t: number = obj.payload;
    }
}

function foo({ kind, payload }: Data) {
    if (kind === 'str') {
        let t: string = payload;
    }
    else {
        let t: number = payload;
    }
}

// Repro from #45830

const obj = {
    fn: () => true
};

if (a) { }

const a = obj.fn();

// repro from https://github.com/microsoft/TypeScript/issues/53267
class Utils {
  static isDefined<T>(value: T): value is NonNullable<T> {
    return value != null;
  }
}

class A53267 {
  public readonly testNumber: number | undefined;

  foo() {
    const isNumber = Utils.isDefined(this.testNumber);

    if (isNumber) {
      const x: number = this.testNumber;
    }
  }
}

//// [controlFlowAliasing.js]
"use strict";
// Narrowing by aliased conditional expressions
function f10(x) {
    const isString = typeof x === "string";
    if (isString) {
        let t = x;
    }
    else {
        let t = x;
    }
}
function f11(x) {
    const isString = typeof x === "string";
    if (isString) {
        let t = x;
    }
}
function f12(x) {
    const isString = typeof x === "string";
    const isNumber = typeof x === "number";
    if (isString || isNumber) {
        let t = x;
    }
    else {
        let t = x;
    }
}
function f13(x) {
    const isString = typeof x === "string";
    const isNumber = typeof x === "number";
    const isStringOrNumber = isString || isNumber;
    if (isStringOrNumber) {
        let t = x;
    }
    else {
        let t = x;
    }
}
function f14(x) {
    const notUndefined = x !== undefined;
    return notUndefined ? x : 0;
}
function f15(obj) {
    const isString = typeof obj.x === 'string';
    if (isString) {
        let s = obj.x;
    }
}
function f16(obj) {
    const isString = typeof obj.x === 'string';
    obj = { x: 42 };
    if (isString) {
        let s = obj.x; // Not narrowed because of is assigned in function body
    }
}
function f17(obj) {
    const isString = typeof obj[0] === 'string';
    if (isString) {
        let s = obj[0];
    }
}
function f18(obj) {
    const isString = typeof obj[0] === 'string';
    obj = [42];
    if (isString) {
        let s = obj[0]; // Not narrowed because of is assigned in function body
    }
}
function f20(obj) {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f21(obj) {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo; // Not narrowed because isFoo has type annotation
    }
    else {
        obj.bar; // Not narrowed because isFoo has type annotation
    }
}
function f22(obj) {
    let isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo; // Not narrowed because isFoo is mutable
    }
    else {
        obj.bar; // Not narrowed because isFoo is mutable
    }
}
function f23(obj) {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Not narrowed because obj is assigned in function body
    }
    else {
        obj.bar; // Not narrowed because obj is assigned in function body
    }
}
function f24(arg) {
    const obj = arg;
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f25(arg) {
    let obj = arg;
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f26(outer) {
    const isFoo = outer.obj.kind === 'foo';
    if (isFoo) {
        outer.obj.foo;
    }
    else {
        outer.obj.bar;
    }
}
function f27(outer) {
    const isFoo = outer.obj.kind === 'foo';
    if (isFoo) {
        outer.obj.foo; // Not narrowed because obj is mutable
    }
    else {
        outer.obj.bar; // Not narrowed because obj is mutable
    }
}
function f28(obj) {
    const isFoo = obj && obj.kind === 'foo';
    const isBar = obj && obj.kind === 'bar';
    if (isFoo) {
        obj.foo;
    }
    if (isBar) {
        obj.bar;
    }
}
// Narrowing by aliased discriminant property access
function f30(obj) {
    const kind = obj.kind;
    if (kind === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f31(obj) {
    const { kind } = obj;
    if (kind === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f32(obj) {
    const { kind: k } = obj;
    if (k === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f33(obj) {
    const { kind } = obj;
    switch (kind) {
        case 'foo':
            obj.foo;
            break;
        case 'bar':
            obj.bar;
            break;
    }
}
class C10 {
    x;
    constructor(x) {
        this.x = x;
        const thisX_isString = typeof this.x === 'string';
        const xIsString = typeof x === 'string';
        if (thisX_isString && xIsString) {
            let s;
            s = this.x;
            s = x;
        }
    }
}
class C11 {
    x;
    constructor(x) {
        this.x = x;
        const thisX_isString = typeof this.x === 'string';
        const xIsString = typeof x === 'string';
        if (thisX_isString && xIsString) {
            // Some narrowings may be invalidated due to later assignments.
            let s;
            s = this.x;
            s = x;
        }
        else {
            this.x = 10;
            x = 10;
        }
    }
}
// Mixing of aliased discriminants and conditionals
function f40(obj) {
    const { kind } = obj;
    const isFoo = kind == 'foo';
    if (isFoo && obj.foo) {
        let t = obj.foo;
    }
}
function gg2(obj) {
    if (obj.kind === 'str') {
        let t = obj.payload;
    }
    else {
        let t = obj.payload;
    }
}
function foo({ kind, payload }) {
    if (kind === 'str') {
        let t = payload;
    }
    else {
        let t = payload;
    }
}
// Repro from #45830
const obj = {
    fn: () => true
};
if (a) { }
const a = obj.fn();
// repro from https://github.com/microsoft/TypeScript/issues/53267
class Utils {
    static isDefined(value) {
        return value != null;
    }
}
class A53267 {
    testNumber;
    foo() {
        const isNumber = Utils.isDefined(this.testNumber);
        if (isNumber) {
            const x = this.testNumber;
        }
    }
}


//// [controlFlowAliasing.d.ts]
declare function f10(x: string | number): void;
declare function f11(x: unknown): void;
declare function f12(x: string | number | boolean): void;
declare function f13(x: string | number | boolean): void;
declare function f14(x: number | null | undefined): number | null;
declare function f15(obj: {
    readonly x: string | number;
}): void;
declare function f16(obj: {
    readonly x: string | number;
}): void;
declare function f17(obj: readonly [string | number]): void;
declare function f18(obj: readonly [string | number]): void;
declare function f20(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f21(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f22(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f23(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f24(arg: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f25(arg: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f26(outer: {
    readonly obj: {
        kind: 'foo';
        foo: string;
    } | {
        kind: 'bar';
        bar: number;
    };
}): void;
declare function f27(outer: {
    obj: {
        kind: 'foo';
        foo: string;
    } | {
        kind: 'bar';
        bar: number;
    };
}): void;
declare function f28(obj?: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f30(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f31(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f32(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare function f33(obj: {
    kind: 'foo';
    foo: string;
} | {
    kind: 'bar';
    bar: number;
}): void;
declare class C10 {
    readonly x: string | number;
    constructor(x: string | number);
}
declare class C11 {
    readonly x: string | number;
    constructor(x: string | number);
}
declare function f40(obj: {
    kind: 'foo';
    foo?: string;
} | {
    kind: 'bar';
    bar?: number;
}): void;
type Data = {
    kind: 'str';
    payload: string;
} | {
    kind: 'num';
    payload: number;
};
declare function gg2(obj: Data): void;
declare function foo({ kind, payload }: Data): void;
declare const obj: {
    fn: () => boolean;
};
declare const a: boolean;
declare class Utils {
    static isDefined<T>(value: T): value is NonNullable<T>;
}
declare class A53267 {
    readonly testNumber: number | undefined;
    foo(): void;
}
