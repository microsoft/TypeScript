// @strictNullChecks: true

// Repro. from #24193

interface WithError {
    error: Error
    data: null
}

interface WithoutError<Data> {
    error: null
    data: Data
}

type DataCarrier<Data> = WithError | WithoutError<Data>

function test<Data>(carrier: DataCarrier<Data>) {
    if (carrier.error === null) {
        const error: null = carrier.error
        const data: Data = carrier.data
    }
    else {
        const error: Error = carrier.error
        const data: null = carrier.data
    }
}

// Repro. from #24479

export interface Errored {
    error: Error
    value: null
}

export interface Succeeded<Value> {
    error: null
    value: Value
}

type Result<T> = Succeeded<T> | Errored;

declare function getVal<T>(x :T): Result<T>

let x = getVal("hello");

if (x.error === null) {
    x.value.toUpperCase();
}

type ErrorOrSuccess<T> = | { value: null, message: string } | { value: T };

declare function getErrorOrSuccess<T>(x :T): ErrorOrSuccess<T>
let y = getErrorOrSuccess({y: "foo"});

if(y.value === null) {
    // ok
    "message: " + y.message;
}

function genericNarrow<T>(x: T): true {
    let y = getErrorOrSuccess(x);
    if(y.value === null) {
        // not ok because T could be null
        "message: " + y.message;
    }
    return true;
}

interface A {
    f?: number;
    bar: string; 
}

interface B {
    f: number; 
}

declare const aOrB: A | B;
if (aOrB.f === undefined) {
    // ok
    aOrB.bar
} 

interface C {
    f: null;
    baz: string;
}

declare const aOrBorC: A | B | C;
if (aOrBorC.f == null) {
    // not ok
    aOrBorC.bar
}

if (aOrBorC.f === null) {
    // ok
    aOrBorC.baz
} 

if (aOrBorC.f === undefined) {
    // ok
    aOrBorC.bar
} 



