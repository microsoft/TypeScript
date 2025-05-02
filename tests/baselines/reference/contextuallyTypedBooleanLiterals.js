//// [tests/cases/compiler/contextuallyTypedBooleanLiterals.ts] ////

//// [contextuallyTypedBooleanLiterals.ts]
// Repro from #48363

type Box<T> = {
    get: () => T,
    set: (value: T) => void
}

declare function box<T>(value: T): Box<T>;

const bn1 = box(0);  // Box<number>
const bn2: Box<number> = box(0);  // Ok

const bb1 = box(false);  // Box<boolean>
const bb2: Box<boolean> = box(false);  // Error, box<false> not assignable to Box<boolean>

// Repro from #48150

interface Observable<T>
{
  (): T;
  (value: T): any;
}

declare function observable<T>(value: T): Observable<T>;

const x: Observable<boolean> = observable(false);


//// [contextuallyTypedBooleanLiterals.js]
"use strict";
// Repro from #48363
var bn1 = box(0); // Box<number>
var bn2 = box(0); // Ok
var bb1 = box(false); // Box<boolean>
var bb2 = box(false); // Error, box<false> not assignable to Box<boolean>
var x = observable(false);


//// [contextuallyTypedBooleanLiterals.d.ts]
type Box<T> = {
    get: () => T;
    set: (value: T) => void;
};
declare function box<T>(value: T): Box<T>;
declare const bn1: Box<number>;
declare const bn2: Box<number>;
declare const bb1: Box<boolean>;
declare const bb2: Box<boolean>;
interface Observable<T> {
    (): T;
    (value: T): any;
}
declare function observable<T>(value: T): Observable<T>;
declare const x: Observable<boolean>;
