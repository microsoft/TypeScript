// @strict: true
// @declaration: true
// @target: es2017

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

type Mapped4<K extends `_${string}`> = {
  [P in K]: P;
};

function f4<K extends `_${string}`>(obj: Mapped4<K>, key: keyof Mapped4<K>) {
  let s: `_${string}` = obj[key];
}

type Mapped5<K extends string> = {
  [P in K as P extends `_${string}` ? P : never]: P;
};

function f5<K extends string>(obj: Mapped5<K>, key: keyof Mapped5<K>) {
  let s: `_${string}` = obj[key];
}

// repro from #53066#issuecomment-1913384757

type Mapped6<K extends string> = {
  [P in K as `_${P}`]: P;
};

function f6<K extends string>(obj: Mapped6<K>, key: keyof Mapped6<K>) {
  let s: `_${string}` = obj[key]; // Error
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
  const shouldBeTrue: true = objectWithUnderscoredKeys[`_${key}`]; // assignability fails here, but ideally should not
}
