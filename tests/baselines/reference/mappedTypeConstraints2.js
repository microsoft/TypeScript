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

// Repro from #48626

interface Bounds {
    min: number;
    max: number;
}

type NumericBoundsOf<T> = {
    [K in keyof T as T[K] extends number | undefined ? K : never]: Bounds;
}

function validate<T extends object>(obj: T, bounds: NumericBoundsOf<T>) {
    for (const [key, val] of Object.entries(obj)) {
        const boundsForKey = bounds[key as keyof NumericBoundsOf<T>];
        if (boundsForKey) {
            const { min, max } = boundsForKey;
            if (min > val || max < val) return false;
        }
    }
    return true;
}

// repro from #50030

type ObjectWithUnderscoredKeys<K extends string> = {
    [k in K as `_${k}`]: true;
};

function genericTest<K extends string>(objectWithUnderscoredKeys: ObjectWithUnderscoredKeys<K>, key: K) {
  const shouldBeTrue: true = objectWithUnderscoredKeys[`_${key}`];
}


//// [mappedTypeConstraints2.js]
"use strict";
function f1(obj, key) {
    const x = obj[key];
}
function f2(obj, key) {
    const x = obj[key]; // Error
}
function f3(obj, key) {
    const x = obj[key]; // Error
}
const get = (t, foo) => foo[`get${t}`]; // Type 'Foo<T>[`get${T}`]' is not assignable to type 'T'
function validate(obj, bounds) {
    for (const [key, val] of Object.entries(obj)) {
        const boundsForKey = bounds[key];
        if (boundsForKey) {
            const { min, max } = boundsForKey;
            if (min > val || max < val)
                return false;
        }
    }
    return true;
}
function genericTest(objectWithUnderscoredKeys, key) {
    const shouldBeTrue = objectWithUnderscoredKeys[`_${key}`];
}


//// [mappedTypeConstraints2.d.ts]
type Mapped1<K extends string> = {
    [P in K]: {
        a: P;
    };
};
declare function f1<K extends string>(obj: Mapped1<K>, key: K): void;
type Mapped2<K extends string> = {
    [P in K as `get${P}`]: {
        a: P;
    };
};
declare function f2<K extends string>(obj: Mapped2<K>, key: `get${K}`): void;
type Mapped3<K extends string> = {
    [P in K as Uppercase<P>]: {
        a: P;
    };
};
declare function f3<K extends string>(obj: Mapped3<K>, key: Uppercase<K>): void;
type Foo<T extends string> = {
    [RemappedT in T as `get${RemappedT}`]: RemappedT;
};
declare const get: <T extends string>(t: T, foo: Foo<T>) => T;
interface Bounds {
    min: number;
    max: number;
}
type NumericBoundsOf<T> = {
    [K in keyof T as T[K] extends number | undefined ? K : never]: Bounds;
};
declare function validate<T extends object>(obj: T, bounds: NumericBoundsOf<T>): boolean;
type ObjectWithUnderscoredKeys<K extends string> = {
    [k in K as `_${k}`]: true;
};
declare function genericTest<K extends string>(objectWithUnderscoredKeys: ObjectWithUnderscoredKeys<K>, key: K): void;
