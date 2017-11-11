//// [neverInference.ts]
declare function f1<T>(x: T[]): T;

let neverArray: never[] = [];

let a1 = f1([]);  // never
let a2 = f1(neverArray);  // never

// Repro from #19576

type Comparator<T> = (x: T, y: T) => number;

interface LinkedList<T> {
    comparator: Comparator<T>,
    nodes: Node<T>
}

type Node<T> = { value: T, next: Node<T> } | null

declare function compareNumbers(x: number, y: number): number;
declare function mkList<T>(items: T[], comparator: Comparator<T>): LinkedList<T>;

const list: LinkedList<number> = mkList([], compareNumbers);

// Repro from #19858

declare function f2<a>(as1: a[], as2: a[], cmp: (a1: a, a2: a) => number): void;
f2(Array.from([0]), [], (a1, a2) => a1 - a2);
f2(Array.from([]), [0], (a1, a2) => a1 - a2);


//// [neverInference.js]
"use strict";
let neverArray = [];
let a1 = f1([]); // never
let a2 = f1(neverArray); // never
const list = mkList([], compareNumbers);
f2(Array.from([0]), [], (a1, a2) => a1 - a2);
f2(Array.from([]), [0], (a1, a2) => a1 - a2);
