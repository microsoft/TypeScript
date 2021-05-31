//// [constAssertions.ts]
let v1 = 'abc' as const;
let v2 = `abc` as const;
let v3 = 10 as const;
let v4 = -10 as const;
let v5 = +10 as const;
let v6 = 10n as const;
let v7 = -10n as const;
let v8 = true as const;
let v9 = false as const;

let c1 = 'abc' as const;
let c2 = `abc` as const;
let c3 = 10 as const;
let c4 = -10 as const;
let c5 = +10 as const;
let c6 = 10n as const;
let c7 = -10n as const;
let c8 = true as const;
let c9 = false as const;

let vv1 = v1;
let vc1 = c1;

let a1 = [] as const;
let a2 = [1, 2, 3] as const;
let a3 = [10, 'hello', true] as const;
let a4 = [...[1, 2, 3]] as const;
let a5 = [1, 2, 3];
let a6 = [...a5] as const;
let a7 = [...a6];
let a8 = ['abc', ...a7] as const;
let a9 = [...a8];

declare let d: { [x: string]: string };

let o1 = { x: 10, y: 20 } as const;
let o2 = { a: 1, 'b': 2, ['c']: 3, d() {}, ['e' + '']: 4 } as const;
let o3 = { ...o1, ...o2 } as const;
let o4 = { a: 1, b: 2 };
let o5 = { ...o4 } as const;
let o6 = { ...o5 };
let o7 = { ...d } as const;
let o8 = { ...o7 };
let o9 = { x: 10, foo() { this.x = 20 } } as const;  // Error

let p1 = (10) as const;
let p2 = ((-10)) as const;
let p3 = ([(10)]) as const;
let p4 = [[[[10]]]] as const;

let x1 = { x: 10, y: [20, 30], z: { a: { b: 42 } } } as const;

let q1 = <const> 10;
let q2 = <const> 'abc';
let q3 = <const> true;
let q4 = <const> [1, 2, 3];
let q5 = <const> { x: 10, y: 20 };

declare function id<T>(x: T): T;

let e1 = v1 as const;  // Error
let e2 = (true ? 1 : 0) as const;  // Error
let e3 = id(1) as const;  // Error

let t1 = 'foo' as const;
let t2 = 'bar' as const;
let t3 = `${t1}-${t2}` as const;
let t4 = `${`(${t1})`}-${`(${t2})`}` as const;

function ff1(x: 'foo' | 'bar', y: 1 | 2) {
    return `${x}-${y}` as const;
}

function ff2<T extends string, U extends string>(x: T, y: U) {
    return `${x}-${y}` as const;
}

const ts1 = ff2('foo', 'bar');
const ts2 = ff2('foo', !!true ? '0' : '1');
const ts3 = ff2(!!true ? 'top' : 'bottom', !!true ? 'left' : 'right');

function ff3(x: 'foo' | 'bar', y: object) {
    return `${x}${y}` as const;
}

type Action = "verify" | "write";
type ContentMatch = "match" | "nonMatch";
type Outcome = `${Action}_${ContentMatch}`;

function ff4(verify: boolean, contentMatches: boolean) {
    const action : Action = verify ? `verify` : `write`;
    const contentMatch: ContentMatch = contentMatches ? `match` : `nonMatch`;
    const outcome: Outcome = `${action}_${contentMatch}` as const;
    return outcome;
}

function ff5(verify: boolean, contentMatches: boolean) {
    const action = verify ? `verify` : `write`;
    const contentMatch = contentMatches ? `match` : `nonMatch`;
    const outcome = `${action}_${contentMatch}` as const;
    return outcome;
}

function accessorNames<S extends string>(propName: S) {
    return [`get-${propName}`, `set-${propName}`] as const;
}

const ns1 = accessorNames('foo');

//// [constAssertions.js]
"use strict";
let v1 = 'abc';
let v2 = `abc`;
let v3 = 10;
let v4 = -10;
let v5 = +10;
let v6 = 10n;
let v7 = -10n;
let v8 = true;
let v9 = false;
let c1 = 'abc';
let c2 = `abc`;
let c3 = 10;
let c4 = -10;
let c5 = +10;
let c6 = 10n;
let c7 = -10n;
let c8 = true;
let c9 = false;
let vv1 = v1;
let vc1 = c1;
let a1 = [];
let a2 = [1, 2, 3];
let a3 = [10, 'hello', true];
let a4 = [...[1, 2, 3]];
let a5 = [1, 2, 3];
let a6 = [...a5];
let a7 = [...a6];
let a8 = ['abc', ...a7];
let a9 = [...a8];
let o1 = { x: 10, y: 20 };
let o2 = { a: 1, 'b': 2, ['c']: 3, d() { }, ['e' + '']: 4 };
let o3 = { ...o1, ...o2 };
let o4 = { a: 1, b: 2 };
let o5 = { ...o4 };
let o6 = { ...o5 };
let o7 = { ...d };
let o8 = { ...o7 };
let o9 = { x: 10, foo() { this.x = 20; } }; // Error
let p1 = (10);
let p2 = ((-10));
let p3 = ([(10)]);
let p4 = [[[[10]]]];
let x1 = { x: 10, y: [20, 30], z: { a: { b: 42 } } };
let q1 = 10;
let q2 = 'abc';
let q3 = true;
let q4 = [1, 2, 3];
let q5 = { x: 10, y: 20 };
let e1 = v1; // Error
let e2 = (true ? 1 : 0); // Error
let e3 = id(1); // Error
let t1 = 'foo';
let t2 = 'bar';
let t3 = `${t1}-${t2}`;
let t4 = `${`(${t1})`}-${`(${t2})`}`;
function ff1(x, y) {
    return `${x}-${y}`;
}
function ff2(x, y) {
    return `${x}-${y}`;
}
const ts1 = ff2('foo', 'bar');
const ts2 = ff2('foo', !!true ? '0' : '1');
const ts3 = ff2(!!true ? 'top' : 'bottom', !!true ? 'left' : 'right');
function ff3(x, y) {
    return `${x}${y}`;
}
function ff4(verify, contentMatches) {
    const action = verify ? `verify` : `write`;
    const contentMatch = contentMatches ? `match` : `nonMatch`;
    const outcome = `${action}_${contentMatch}`;
    return outcome;
}
function ff5(verify, contentMatches) {
    const action = verify ? `verify` : `write`;
    const contentMatch = contentMatches ? `match` : `nonMatch`;
    const outcome = `${action}_${contentMatch}`;
    return outcome;
}
function accessorNames(propName) {
    return [`get-${propName}`, `set-${propName}`];
}
const ns1 = accessorNames('foo');


//// [constAssertions.d.ts]
declare let v1: "abc";
declare let v2: "abc";
declare let v3: 10;
declare let v4: -10;
declare let v5: 10;
declare let v6: 10n;
declare let v7: -10n;
declare let v8: true;
declare let v9: false;
declare let c1: "abc";
declare let c2: "abc";
declare let c3: 10;
declare let c4: -10;
declare let c5: 10;
declare let c6: 10n;
declare let c7: -10n;
declare let c8: true;
declare let c9: false;
declare let vv1: "abc";
declare let vc1: "abc";
declare let a1: readonly [];
declare let a2: readonly [1, 2, 3];
declare let a3: readonly [10, "hello", true];
declare let a4: readonly [1, 2, 3];
declare let a5: number[];
declare let a6: readonly number[];
declare let a7: number[];
declare let a8: readonly ["abc", ...number[]];
declare let a9: (number | "abc")[];
declare let d: {
    [x: string]: string;
};
declare let o1: {
    readonly x: 10;
    readonly y: 20;
};
declare let o2: {
    readonly [x: string]: 1 | 2 | 3 | (() => void) | 4;
    readonly a: 1;
    readonly b: 2;
    readonly c: 3;
    readonly d: () => void;
};
declare let o3: {
    readonly a: 1;
    readonly b: 2;
    readonly c: 3;
    readonly d: () => void;
    readonly x: 10;
    readonly y: 20;
};
declare let o4: {
    a: number;
    b: number;
};
declare let o5: {
    readonly a: number;
    readonly b: number;
};
declare let o6: {
    a: number;
    b: number;
};
declare let o7: {
    readonly [x: string]: string;
};
declare let o8: {
    [x: string]: string;
};
declare let o9: {
    readonly x: 10;
    readonly foo: () => void;
};
declare let p1: 10;
declare let p2: -10;
declare let p3: readonly [10];
declare let p4: readonly [readonly [readonly [readonly [10]]]];
declare let x1: {
    readonly x: 10;
    readonly y: readonly [20, 30];
    readonly z: {
        readonly a: {
            readonly b: 42;
        };
    };
};
declare let q1: 10;
declare let q2: "abc";
declare let q3: true;
declare let q4: readonly [1, 2, 3];
declare let q5: {
    readonly x: 10;
    readonly y: 20;
};
declare function id<T>(x: T): T;
declare let e1: "abc";
declare let e2: 0 | 1;
declare let e3: 1;
declare let t1: "foo";
declare let t2: "bar";
declare let t3: "foo-bar";
declare let t4: "(foo)-(bar)";
declare function ff1(x: 'foo' | 'bar', y: 1 | 2): "foo-1" | "foo-2" | "bar-1" | "bar-2";
declare function ff2<T extends string, U extends string>(x: T, y: U): `${T}-${U}`;
declare const ts1: "foo-bar";
declare const ts2: "foo-1" | "foo-0";
declare const ts3: "top-left" | "top-right" | "bottom-left" | "bottom-right";
declare function ff3(x: 'foo' | 'bar', y: object): `foo${string}` | `bar${string}`;
declare type Action = "verify" | "write";
declare type ContentMatch = "match" | "nonMatch";
declare type Outcome = `${Action}_${ContentMatch}`;
declare function ff4(verify: boolean, contentMatches: boolean): "verify_match" | "verify_nonMatch" | "write_match" | "write_nonMatch";
declare function ff5(verify: boolean, contentMatches: boolean): "verify_match" | "verify_nonMatch" | "write_match" | "write_nonMatch";
declare function accessorNames<S extends string>(propName: S): readonly [`get-${S}`, `set-${S}`];
declare const ns1: readonly ["get-foo", "set-foo"];
