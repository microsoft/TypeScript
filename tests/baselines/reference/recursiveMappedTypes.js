//// [recursiveMappedTypes.ts]
// Recursive mapped types simply appear empty

type Recurse = {
    [K in keyof Recurse]: Recurse[K]
}

type Recurse1 = {
    [K in keyof Recurse2]: Recurse2[K]
}

type Recurse2 = {
    [K in keyof Recurse1]: Recurse1[K]
}

// Repro from #27881

export type Circular<T> = {[P in keyof T]: Circular<T>};
type tup = [number, number, number, number];

function foo(arg: Circular<tup>): tup {
  return arg;
}


//// [recursiveMappedTypes.js]
"use strict";
// Recursive mapped types simply appear empty
exports.__esModule = true;
function foo(arg) {
    return arg;
}


//// [recursiveMappedTypes.d.ts]
export declare type Circular<T> = {
    [P in keyof T]: Circular<T>;
};
