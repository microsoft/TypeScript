// Repro #20863

// An object to hold all the possible options
type AllOptions = {
    startDate: Date
    endDate: Date
    author: number
}

// Any combination of startDate, endDate can be used
type DateOptions =
    | Pick<AllOptions, 'startDate'>
    | Pick<AllOptions, 'endDate'>
    | Pick<AllOptions, 'startDate' | 'endDate'>

type AuthorOptions = Pick<AllOptions, 'author'>

type AllowedOptions = DateOptions | AuthorOptions

// options double dips
const options: AllowedOptions = {
    startDate: new Date(), // error
    author: 1
}

// Repro #13813

interface A {
    x: string
}

interface B {
    a: A;
}

interface C {
    c: number;
}

type D = B & C;

let a: B = {a: {x: 'hello'}}; // ok
let b: B = {a: {x: 2}}; // error - types of property x are incompatible
let c: B = {a: {x: 'hello', y: 2}}; // error - y does not exist in type B

let d: D = {a: {x: 'hello'}, c: 5}; // ok
let e: D = {a: {x: 2}, c: 5}; // error - types of property x are incompatible
let f: D = {a: {x: 'hello', y: 2}, c: 5}; // y does not exist in type D

// Repro #23706

type Template<T> = {
    [K in keyof T]: Template<T[K]>;
} & {
    __name?: string;
}

const template: Template<{
    foo: number;
    bar: {
        baz: string;
    }
}> = {
    foo: 1,
    __name: 'n',
    bar: {
        baz: 'b',
        not_exist_key: true // error
    }
};

// Other tests

// Empty alias normalises {} for intersection, but EmptyInterface will
// not. Check that they behave the same.

type Empty = {};
interface EmptyInterface {}

let empty1: A & Empty = {x: "hello"};
let empty2: A & EmptyInterface = {x: "hello"};
let empty3: A & Empty = {x: "hello", y: true}; // error as A & Empty = A
let empty4: A & EmptyInterface = {x: "hello", y: true}; // error as A & EmptyInterface is equivalent to A
let empty5: {x: A} & {x: Empty} = {x: {x: "hello"}};
let empty6: {x: A} & {x: EmptyInterface} = {x: {x: "hello"}};
let empty7: {x: A} & {x: Empty} = {x: {x: "hello", y: true}}; // error
let empty8: {x: A} & {x: EmptyInterface} = {x: {x: "hello", y: true}}; // error

// Nesting with intersection and union

type Nesting = {x: {a: boolean, b: string}} | {x: {y: boolean} & {z: string} & {}};

let nesting1: Nesting = {x: {a: true, b: "b"}};
let nesting2: Nesting = {y: "excess"}; // y is excess
let nesting3: Nesting = {x: {excess: true}}; // excess is excess
let nesting4: Nesting = {x: {a: true, b: "b", y: true, z: "hello"}}; // Double dipping on both sides of the union
let nesting5: Nesting = {x: {y: true, z: "b", excess: true}}; // excess is excess


type InnerUnion = {x: ({y: string} | {z: boolean})} & {x: {q: boolean}};
let innerUnion1: InnerUnion = {x: {y: "ok", q: true}};
let innerUnion2: InnerUnion = {x: {z: true, q: true}};
let innerUnion3: InnerUnion = {x: {y: "not ok", z: true, q: true}};
