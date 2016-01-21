//// [stringLiteralsInArrays06.ts]

interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[]
}

let a = ["a", "b", "c"];

let b = a.concatHeterogeneously(["a", "b", "c"]);
let c = a.concatHeterogeneously(["d", "e", "f"]);
let d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
let e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
let f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
let g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

let h = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"]);
let i = ["a", "b", "c"].concatHeterogeneously(["d", "e", "f"]);
let j = ["a", "b", "c"].concatHeterogeneously(["a"], ["a"], ["a"]);
let k = ["a", "b", "c"].concatHeterogeneously(["d"], ["e"], ["f"]);
let l = ["a", "b", "c"].concatHeterogeneously(["a"], ["a"], ["a"]);
let m = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

//// [stringLiteralsInArrays06.js]
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
var l = ["a", "b", "c"].concatHeterogeneously(["a"], ["a"], ["a"]);
var m = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);


//// [stringLiteralsInArrays06.d.ts]
interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[];
}
declare let a: string[];
declare let b: string[];
declare let c: string[];
declare let d: string[];
declare let e: string[];
declare let f: string[];
declare let g: string[];
declare let h: string[];
declare let i: string[];
declare let j: string[];
declare let k: string[];
declare let l: string[];
declare let m: string[];
