// @strictNullChecks: true
// @noimplicitany: true
// @declaration: true

type Box<T> = {
    value: T;
}

type Boxified<T> = {
    [P in keyof T]: Box<T[P]>;
}

function box<T>(x: T): Box<T> {
    return { value: x };
}

function unbox<T>(x: Box<T>): T {
    return x.value;
}

function boxify<T>(obj: T): Boxified<T> {
    let result = {} as Boxified<T>;
    for (let k in obj) {
        result[k] = box(obj[k]);
    }
    return result;
}

function unboxify<T>(obj: Boxified<T>): T {
    let result = {} as T;
    for (let k in obj) {
        result[k] = unbox(obj[k]);
    }
    return result;
}

function assignBoxified<T>(obj: Boxified<T>, values: T) {
    for (let k in values) {
        obj[k].value = values[k];
    }
}

function f1() {
    let v = {
        a: 42,
        b: "hello",
        c: true
    };
    let b = boxify(v);
    let x: number = b.a.value;
}

function f2() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    let v = unboxify(b);
    let x: number = v.a;
}

function f3() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    assignBoxified(b, { c: false });
}

function f4() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    b = boxify(unboxify(b));
    b = unboxify(boxify(b));
}

function makeRecord<T, K extends string>(obj: { [P in K]: T }) {
    return obj;
}

function f5(s: string) {
    let b = makeRecord({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x: string | number | boolean = v.a;
}

function makeDictionary<T>(obj: { [x: string]: T }) {
    return obj;
}

function f6(s: string) {
    let b = makeDictionary({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x: string | number | boolean = v[s];
}

declare function validate<T>(obj: { [P in keyof T]?: T[P] }): T;
declare function clone<T>(obj: { readonly [P in keyof T]: T[P] }): T;
declare function validateAndClone<T>(obj: { readonly [P in keyof T]?: T[P] }): T;

type Foo = {
    a?: number;
    readonly b: string;
}

function f10(foo: Foo) {
    let x = validate(foo);  // { a: number, readonly b: string }
    let y = clone(foo);  // { a?: number, b: string }
    let z = validateAndClone(foo);  // { a: number, b: string }
}

// Repro from #12606

type Func<T> = (...args: any[]) => T;
type Spec<T> = {
    [P in keyof T]: Func<T[P]> | Spec<T[P]> ;
};

/**
 * Given a spec object recursively mapping properties to functions, creates a function
 * producing an object of the same structure, by mapping each property to the result
 * of calling its associated function with the supplied arguments.
 */
declare function applySpec<T>(obj: Spec<T>): (...args: any[]) => T;

// Infers g1: (...args: any[]) => { sum: number, nested: { mul: string } }
var g1 = applySpec({
    sum: (a: any) => 3,
    nested: {
        mul: (b: any) => "n"
    }
});

// Infers g2: (...args: any[]) => { foo: { bar: { baz: boolean } } }
var g2 = applySpec({ foo: { bar: { baz: (x: any) => true } } });

// Repro from #12633

const foo = <T>(object: T, partial: Partial<T>) => object;
let o = {a: 5, b: 7};
foo(o, {b: 9});
o = foo(o, {b: 9});