//// [mappedTypeConstraints2.ts]
type Mapped1<K extends string> = { [P in K]: { a: P } };

function f1<K extends string>(obj: Mapped1<K>, key: K) {
    const x: { a: K } = obj[key];
}

type Mapped2<K extends string> = { [P in K as `get${P}`]: { a: P } };

function f2<K extends string>(obj: Mapped2<K>, key: `get${K}`) {
    const x: { a: K } = obj[key];  // Error
}

type Mapped3<K extends string> = { [P in K as Uppercase<P>]: { a: P } };

function f3<K extends string>(obj: Mapped3<K>, key: Uppercase<K>) {
    const x: { a: K } = obj[key];  // Error
}

// Repro from #47794

type Foo<T extends string> = {
    [RemappedT in T as `get${RemappedT}`]: RemappedT;
};

const get = <T extends string>(t: T, foo: Foo<T>): T => foo[`get${t}`];  // Type 'Foo<T>[`get${T}`]' is not assignable to type 'T'


//// [mappedTypeConstraints2.js]
"use strict";
function f1(obj, key) {
    var x = obj[key];
}
function f2(obj, key) {
    var x = obj[key]; // Error
}
function f3(obj, key) {
    var x = obj[key]; // Error
}
var get = function (t, foo) { return foo["get".concat(t)]; }; // Type 'Foo<T>[`get${T}`]' is not assignable to type 'T'


//// [mappedTypeConstraints2.d.ts]
declare type Mapped1<K extends string> = {
    [P in K]: {
        a: P;
    };
};
declare function f1<K extends string>(obj: Mapped1<K>, key: K): void;
declare type Mapped2<K extends string> = {
    [P in K as `get${P}`]: {
        a: P;
    };
};
declare function f2<K extends string>(obj: Mapped2<K>, key: `get${K}`): void;
declare type Mapped3<K extends string> = {
    [P in K as Uppercase<P>]: {
        a: P;
    };
};
declare function f3<K extends string>(obj: Mapped3<K>, key: Uppercase<K>): void;
declare type Foo<T extends string> = {
    [RemappedT in T as `get${RemappedT}`]: RemappedT;
};
declare const get: <T extends string>(t: T, foo: Foo<T>) => T;
