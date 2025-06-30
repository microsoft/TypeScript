//// [tests/cases/compiler/contextuallyTypedBooleanLiterals.ts] ////

//// [contextuallyTypedBooleanLiterals.ts]
// Repro from #48363

type Box<T> = {
  get: () => T;
  set: (value: T) => void;
};

declare function box<T>(value: T): Box<T>;

const bn1 = box(0); // Box<number>
const bn2: Box<number> = box(0); // Ok, Box<number>

const bb1 = box(false); // Box<boolean>
const bb2: Box<boolean> = box(false); // Ok, Box<boolean>

// https://github.com/microsoft/TypeScript/issues/59754

const bn3 = box({ prop: 0 }); // Box<{ prop: number }>
const bn4: Box<{ prop: number }> = box({ prop: 0 }); // Ok, Box<{ prop: number }>

const bb3 = box({ prop: false }); // Box<boolean>
const bb4: Box<{ prop: boolean }> = box({ prop: false }); // Ok, Box<{ prop: boolean }>

const bn5 = box([0]); // Box<[number]>
const bn6: Box<[number]> = box([0]); // Ok, Box<[number]>

const bb5 = box([false]); // Box<[boolean]>
const bb6: Box<[boolean]> = box([false]); // Ok, Box<[boolean]>

const bb7: Box<{ deep: { prop: boolean } }> = box({ deep: { prop: false } }); // Ok, Box<{ deep: { prop: boolean } }>

const bb8: Box<{ prop: true; other: string } | { prop: false; other: number }> = box({ prop: false, other: 0 }); // Error (T is invariant), Box<{ prop: false; other: number }>

const bb9: Box<false> = box(false); // Ok, Box<false>

const bb10: Box<{ prop: false }> = box({ prop: false }); // Ok, Box<{ prop: false }>

type Box2<T> = {
  get: () => T;
};

const bb11: Box2<{ prop: true; other: string } | { prop: false; other: number }> = box2({ prop: false, other: 0 }); // Ok, Box2<{ prop: false; other: number }>

declare function box2<T>(value: T): Box2<T>;

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
var bn2 = box(0); // Ok, Box<number>
var bb1 = box(false); // Box<boolean>
var bb2 = box(false); // Ok, Box<boolean>
// https://github.com/microsoft/TypeScript/issues/59754
var bn3 = box({ prop: 0 }); // Box<{ prop: number }>
var bn4 = box({ prop: 0 }); // Ok, Box<{ prop: number }>
var bb3 = box({ prop: false }); // Box<boolean>
var bb4 = box({ prop: false }); // Ok, Box<{ prop: boolean }>
var bn5 = box([0]); // Box<[number]>
var bn6 = box([0]); // Ok, Box<[number]>
var bb5 = box([false]); // Box<[boolean]>
var bb6 = box([false]); // Ok, Box<[boolean]>
var bb7 = box({ deep: { prop: false } }); // Ok, Box<{ deep: { prop: boolean } }>
var bb8 = box({ prop: false, other: 0 }); // Error (T is invariant), Box<{ prop: false; other: number }>
var bb9 = box(false); // Ok, Box<false>
var bb10 = box({ prop: false }); // Ok, Box<{ prop: false }>
var bb11 = box2({ prop: false, other: 0 }); // Ok, Box2<{ prop: false; other: number }>
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
declare const bn3: Box<{
    prop: number;
}>;
declare const bn4: Box<{
    prop: number;
}>;
declare const bb3: Box<{
    prop: boolean;
}>;
declare const bb4: Box<{
    prop: boolean;
}>;
declare const bn5: Box<number[]>;
declare const bn6: Box<[number]>;
declare const bb5: Box<boolean[]>;
declare const bb6: Box<[boolean]>;
declare const bb7: Box<{
    deep: {
        prop: boolean;
    };
}>;
declare const bb8: Box<{
    prop: true;
    other: string;
} | {
    prop: false;
    other: number;
}>;
declare const bb9: Box<false>;
declare const bb10: Box<{
    prop: false;
}>;
type Box2<T> = {
    get: () => T;
};
declare const bb11: Box2<{
    prop: true;
    other: string;
} | {
    prop: false;
    other: number;
}>;
declare function box2<T>(value: T): Box2<T>;
interface Observable<T> {
    (): T;
    (value: T): any;
}
declare function observable<T>(value: T): Observable<T>;
declare const x: Observable<boolean>;
