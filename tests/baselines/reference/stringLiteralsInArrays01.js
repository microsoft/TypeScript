//// [stringLiteralsInArrays01.ts]

interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[];
}

const a = ["a", "b", "c"];

const b = a.concatHomogeneously(["a", "b", "c"]);
const c = a.concatHomogeneously(["d", "e", "f"]);
const d = a.concatHomogeneously(["a"], ["a"], ["a"]);
const e = a.concatHomogeneously(["d"], ["e"], ["f"]);
const f = a.concatHomogeneously(["a"], ["b"], ["c"]);
const g = a.concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

const h = ["a", "b", "c"].concatHomogeneously(["a", "b", "c"]);
const i = ["a", "b", "c"].concatHomogeneously(["d", "e", "f"]);
const j = ["a", "b", "c"].concatHomogeneously(["a"], ["a"], ["a"]);
const k = ["a", "b", "c"].concatHomogeneously(["d"], ["e"], ["f"]);
const l = ["a", "b", "c"].concatHomogeneously(["a"], ["a"], ["a"]);
const m = ["a", "b", "c"].concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

//// [stringLiteralsInArrays01.js]
var a = ["a", "b", "c"];
var b = a.concatHomogeneously(["a", "b", "c"]);
var c = a.concatHomogeneously(["d", "e", "f"]);
var d = a.concatHomogeneously(["a"], ["a"], ["a"]);
var e = a.concatHomogeneously(["d"], ["e"], ["f"]);
var f = a.concatHomogeneously(["a"], ["b"], ["c"]);
var g = a.concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);
var h = ["a", "b", "c"].concatHomogeneously(["a", "b", "c"]);
var i = ["a", "b", "c"].concatHomogeneously(["d", "e", "f"]);
var j = ["a", "b", "c"].concatHomogeneously(["a"], ["a"], ["a"]);
var k = ["a", "b", "c"].concatHomogeneously(["d"], ["e"], ["f"]);
var l = ["a", "b", "c"].concatHomogeneously(["a"], ["a"], ["a"]);
var m = ["a", "b", "c"].concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays01.d.ts]
interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[];
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
