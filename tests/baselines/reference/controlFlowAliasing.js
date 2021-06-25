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
        obj.foo;  // Not narrowed because obj is mutable
    }
    else {
        obj.bar;  // Not narrowed because obj is mutable
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


//// [controlFlowAliasing.js]
"use strict";
// Narrowing by aliased conditional expressions
function f10(x) {
    var isString = typeof x === "string";
    if (isString) {
        var t = x;
    }
    else {
        var t = x;
    }
}
function f11(x) {
    var isString = typeof x === "string";
    if (isString) {
        var t = x;
    }
}
function f12(x) {
    var isString = typeof x === "string";
    var isNumber = typeof x === "number";
    if (isString || isNumber) {
        var t = x;
    }
    else {
        var t = x;
    }
}
function f13(x) {
    var isString = typeof x === "string";
    var isNumber = typeof x === "number";
    var isStringOrNumber = isString || isNumber;
    if (isStringOrNumber) {
        var t = x;
    }
    else {
        var t = x;
    }
}
function f14(x) {
    var notUndefined = x !== undefined;
    return notUndefined ? x : 0;
}
function f20(obj) {
    var isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f21(obj) {
    var isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo; // Not narrowed because isFoo has type annotation
    }
    else {
        obj.bar; // Not narrowed because isFoo has type annotation
    }
}
function f22(obj) {
    var isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo; // Not narrowed because isFoo is mutable
    }
    else {
        obj.bar; // Not narrowed because isFoo is mutable
    }
}
function f23(obj) {
    var isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Not narrowed because obj is assigned in function body
    }
    else {
        obj.bar; // Not narrowed because obj is assigned in function body
    }
}
function f24(arg) {
    var obj = arg;
    var isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f25(arg) {
    var obj = arg;
    var isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo; // Not narrowed because obj is mutable
    }
    else {
        obj.bar; // Not narrowed because obj is mutable
    }
}
function f26(outer) {
    var isFoo = outer.obj.kind === 'foo';
    if (isFoo) {
        outer.obj.foo;
    }
    else {
        outer.obj.bar;
    }
}
function f27(outer) {
    var isFoo = outer.obj.kind === 'foo';
    if (isFoo) {
        outer.obj.foo; // Not narrowed because obj is mutable
    }
    else {
        outer.obj.bar; // Not narrowed because obj is mutable
    }
}
function f28(obj) {
    var isFoo = obj && obj.kind === 'foo';
    var isBar = obj && obj.kind === 'bar';
    if (isFoo) {
        obj.foo;
    }
    if (isBar) {
        obj.bar;
    }
}
// Narrowing by aliased discriminant property access
function f30(obj) {
    var kind = obj.kind;
    if (kind === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f31(obj) {
    var kind = obj.kind;
    if (kind === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f32(obj) {
    var k = obj.kind;
    if (k === 'foo') {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
function f33(obj) {
    var kind = obj.kind;
    switch (kind) {
        case 'foo':
            obj.foo;
            break;
        case 'bar':
            obj.bar;
            break;
    }
}
// Mixing of aliased discriminants and conditionals
function f40(obj) {
    var kind = obj.kind;
    var isFoo = kind == 'foo';
    if (isFoo && obj.foo) {
        var t = obj.foo;
    }
}
function gg2(obj) {
    if (obj.kind === 'str') {
        var t = obj.payload;
    }
    else {
        var t = obj.payload;
    }
}
function foo(_a) {
    var kind = _a.kind, payload = _a.payload;
    if (kind === 'str') {
        var t = payload;
    }
    else {
        var t = payload;
    }
}


//// [controlFlowAliasing.d.ts]
declare function f10(x: string | number): void;
declare function f11(x: unknown): void;
declare function f12(x: string | number | boolean): void;
declare function f13(x: string | number | boolean): void;
declare function f14(x: number | null | undefined): number | null;
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
declare function f40(obj: {
    kind: 'foo';
    foo?: string;
} | {
    kind: 'bar';
    bar?: number;
}): void;
declare type Data = {
    kind: 'str';
    payload: string;
} | {
    kind: 'num';
    payload: number;
};
declare function gg2(obj: Data): void;
declare function foo({ kind, payload }: Data): void;
