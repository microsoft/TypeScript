//// [mappedTypeWithAny.ts]
type Item = { value: string };
type ItemMap<T> = { [P in keyof T]: Item };

declare let x0: keyof any;
declare let x1: { [P in any]: Item };
declare let x2: { [P in string]: Item };
declare let x3: { [P in keyof any]: Item };
declare let x4: ItemMap<any>;

// Repro from #19152

type Data = {
  value: string;
}

type StrictDataMap<T> = {
  [P in keyof T]: Data
}

declare let z: StrictDataMap<any>;
for (let id in z) {
  let data = z[id];
  let x = data.notAValue;  // Error
}

// Issue #46169.
// We want mapped types whose constraint is `keyof T` to
// map over `any` differently, depending on whether `T`
// is constrained to an array-like type.
type Arrayish<T extends unknown[]> = { [K in keyof T]: T[K] };
type Objectish<T extends unknown> = { [K in keyof T]: T[K] };

function bar(arrayish: Arrayish<any>, objectish: Objectish<any>) {
    let arr: any[];
    arr = arrayish;
    arr = objectish;
}

declare function stringifyArray<T extends readonly any[]>(arr: T): { -readonly [K in keyof T]: string };
let abc: any[] = stringifyArray(void 0 as any);

//// [mappedTypeWithAny.js]
"use strict";
for (var id in z) {
    var data = z[id];
    var x = data.notAValue; // Error
}
function bar(arrayish, objectish) {
    var arr;
    arr = arrayish;
    arr = objectish;
}
var abc = stringifyArray(void 0);


//// [mappedTypeWithAny.d.ts]
declare type Item = {
    value: string;
};
declare type ItemMap<T> = {
    [P in keyof T]: Item;
};
declare let x0: keyof any;
declare let x1: {
    [P in any]: Item;
};
declare let x2: {
    [P in string]: Item;
};
declare let x3: {
    [P in keyof any]: Item;
};
declare let x4: ItemMap<any>;
declare type Data = {
    value: string;
};
declare type StrictDataMap<T> = {
    [P in keyof T]: Data;
};
declare let z: StrictDataMap<any>;
declare type Arrayish<T extends unknown[]> = {
    [K in keyof T]: T[K];
};
declare type Objectish<T extends unknown> = {
    [K in keyof T]: T[K];
};
declare function bar(arrayish: Arrayish<any>, objectish: Objectish<any>): void;
declare function stringifyArray<T extends readonly any[]>(arr: T): {
    -readonly [K in keyof T]: string;
};
declare let abc: any[];
