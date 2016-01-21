//// [stringLiteralsInArrays05.ts]

interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[]
}

const a = ["a", "b", "c"];

const b = a.concatHeterogeneously(["a", "b", "c"]);
const c = a.concatHeterogeneously(["d", "e", "f"]);
const d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
const e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
const f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
const g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

const h = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"]);
const i = ["a", "b", "c"].concatHeterogeneously(["d", "e", "f"]);
const j = ["a", "b", "c"].concatHeterogeneously(["a"], ["a"], ["a"]);
const k = ["a", "b", "c"].concatHeterogeneously(["d"], ["e"], ["f"]);
const l = ["a", "b", "c"].concatHeterogeneously(["a"], ["b"], ["c"]);
const m = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays05.js]
var a = ["a", "b", "c"];
var b = a.concatHeterogeneously(["a", "b", "c"]);
var c = a.concatHeterogeneously(["d", "e", "f"]);
var d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
var e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
var f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
var g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);
var h = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"]);
var i = ["a", "b", "c"].concatHeterogeneously(["d", "e", "f"]);
var j = ["a", "b", "c"].concatHeterogeneously(["a"], ["a"], ["a"]);
var k = ["a", "b", "c"].concatHeterogeneously(["d"], ["e"], ["f"]);
var l = ["a", "b", "c"].concatHeterogeneously(["a"], ["b"], ["c"]);
var m = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays05.d.ts]
interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[];
}
declare const a: string[];
declare const b: string[];
declare const c: string[];
declare const d: string[];
declare const e: string[];
declare const f: string[];
declare const g: string[];
declare const h: string[];
declare const i: string[];
declare const j: string[];
declare const k: string[];
declare const l: string[];
declare const m: string[];
