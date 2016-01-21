//// [stringLiteralsInArrays08.ts]

interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[]
}

let a: ("a" | "b" | "c")[] = ["a", "b", "c"];
let b = a.concatHeterogeneously(["a", "b", "c"]);
let c = a.concatHeterogeneously(["d", "e", "f"]);
let d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
let e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
let f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
let g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

//// [stringLiteralsInArrays08.js]
var a = ["a", "b", "c"];
var b = a.concatHeterogeneously(["a", "b", "c"]);
var c = a.concatHeterogeneously(["d", "e", "f"]);
var d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
var e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
var f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
var g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays08.d.ts]
interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[];
}
declare let a: ("a" | "b" | "c")[];
declare let b: ("a" | "b" | "c" | string)[];
declare let c: ("a" | "b" | "c" | string)[];
declare let d: ("a" | "b" | "c" | string)[];
declare let e: ("a" | "b" | "c" | string)[];
declare let f: ("a" | "b" | "c" | string)[];
declare let g: ("a" | "b" | "c" | string)[];
