// @target: es2015
// @strict: true

// Test that callback parameters are related covariantly

interface P<T> {
    then(cb: (value: T) => void): void;
};

interface A { a: string }
interface B extends A { b: string }

function f1(a: P<A>, b: P<B>) {
    a = b;
    b = a;  // Error
}

function f2(a: Promise<A>, b: Promise<B>) {
    a = b;
    b = a;  // Error
}

interface AList1 {
    forEach(cb: (item: A) => void): void;
}

interface BList1 {
    forEach(cb: (item: B) => void): void;
}

function f11(a: AList1, b: BList1) {
    a = b;
    b = a;  // Error
}

interface AList2 {
    forEach(cb: (item: A) => boolean): void;
}

interface BList2 {
    forEach(cb: (item: A) => void): void;
}

function f12(a: AList2, b: BList2) {
    a = b;
    b = a;  // Error
}

interface AList3 {
    forEach(cb: (item: A) => void): void;
}

interface BList3 {
    forEach(cb: (item: A, context: any) => void): void;
}

function f13(a: AList3, b: BList3) {
    a = b;
    b = a;  // Error
}

interface AList4 {
    forEach(cb: (item: A) => A): void;
}

interface BList4 {
    forEach(cb: (item: B) => B): void;
}

function f14(a: AList4, b: BList4) {
    a = b;
    b = a;  // Error
}

// Repro from #51620

type Bivar<T> = { set(value: T): void }

declare let bu: Bivar<unknown>;
declare let bs: Bivar<string>;
bu = bs;
bs = bu;

declare let bfu: Bivar<(x: unknown) => void>;
declare let bfs: Bivar<(x: string) => void>;
bfu = bfs;
bfs = bfu;

type Bivar1<T> = { set(value: T): void }
type Bivar2<T> = { set(value: T): void }

declare let b1fu: Bivar1<(x: unknown) => void>;
declare let b2fs: Bivar2<(x: string) => void>;
b1fu = b2fs;
b2fs = b1fu;

type SetLike<T> = { set(value: T): void, get(): T }

declare let sx: SetLike1<(x: unknown) => void>;
declare let sy: SetLike1<(x: string) => void>;
sx = sy;  // Error
sy = sx;

type SetLike1<T> = { set(value: T): void, get(): T }
type SetLike2<T> = { set(value: T): void, get(): T }

declare let s1: SetLike1<(x: unknown) => void>;
declare let s2: SetLike2<(x: string) => void>;
s1 = s2;  // Error
s2 = s1;
