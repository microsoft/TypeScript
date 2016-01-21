//// [stringLiteralsInArrays07.ts]

interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[]
}

const a: ("a" | "b" | "c")[] = ["a", "b", "c"];
const b = a.concatHeterogeneously(["a", "b", "c"]);
const c = a.concatHeterogeneously(["d", "e", "f"]);
const d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
const e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
const f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
const g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

//// [stringLiteralsInArrays07.js]
var a = ["a", "b", "c"];
var b = a.concatHeterogeneously(["a", "b", "c"]);
var c = a.concatHeterogeneously(["d", "e", "f"]);
var d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
var e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
var f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
var g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays07.d.ts]
interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[];
}
declare const a: ("a" | "b" | "c")[];
declare const b: ("a" | "b" | "c" | string)[];
declare const c: ("a" | "b" | "c" | string)[];
declare const d: ("a" | "b" | "c" | string)[];
declare const e: ("a" | "b" | "c" | string)[];
declare const f: ("a" | "b" | "c" | string)[];
declare const g: ("a" | "b" | "c" | string)[];
