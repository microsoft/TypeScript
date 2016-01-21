//// [stringLiteralsInArrays03.ts]

interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[];
}

const a: ("a" | "b" | "c")[] = ["a", "b", "c"];
const b = a.concatHomogeneously(["a", "b", "c"]);
const c = a.concatHomogeneously(["d", "e", "f"]);
const d = a.concatHomogeneously(["a"], ["a"], ["a"]);
const e = a.concatHomogeneously(["d"], ["e"], ["f"]);
const f = a.concatHomogeneously(["a"], ["b"], ["c"]);
const g = a.concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

//// [stringLiteralsInArrays03.js]
var a = ["a", "b", "c"];
var b = a.concatHomogeneously(["a", "b", "c"]);
var c = a.concatHomogeneously(["d", "e", "f"]);
var d = a.concatHomogeneously(["a"], ["a"], ["a"]);
var e = a.concatHomogeneously(["d"], ["e"], ["f"]);
var f = a.concatHomogeneously(["a"], ["b"], ["c"]);
var g = a.concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays03.d.ts]
interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[];
}
declare const a: ("a" | "b" | "c")[];
declare const b: ("a" | "b" | "c")[];
declare const c: any;
declare const d: ("a" | "b" | "c")[];
declare const e: any;
declare const f: ("a" | "b" | "c")[];
declare const g: any;
