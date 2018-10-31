//// [bivariantInferences.ts]
// Repro from #27337

interface Array<T> {
    equalsShallow<T>(this: ReadonlyArray<T>, other: ReadonlyArray<T>): boolean;
}

declare const a: (string | number)[] | null[] | undefined[] | {}[];
declare const b: (string | number)[] | null[] | undefined[] | {}[];

let x = a.equalsShallow(b);


//// [bivariantInferences.js]
"use strict";
// Repro from #27337
var x = a.equalsShallow(b);
