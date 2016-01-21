//// [stringLiteralsInArrays02.ts]

interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[];
}

let a = ["a", "b", "c"];

let b = a.concatHomogeneously(["a", "b", "c"]);
let c = a.concatHomogeneously(["d", "e", "f"]);
let d = a.concatHomogeneously(["a"], ["a"], ["a"]);
let e = a.concatHomogeneously(["d"], ["e"], ["f"]);
let f = a.concatHomogeneously(["a"], ["b"], ["c"]);
let g = a.concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

let h = ["a", "b", "c"].concatHomogeneously(["a", "b", "c"]);
let i = ["a", "b", "c"].concatHomogeneously(["d", "e", "f"]);
let j = ["a", "b", "c"].concatHomogeneously(["a"], ["a"], ["a"]);
let k = ["a", "b", "c"].concatHomogeneously(["d"], ["e"], ["f"]);
let l = ["a", "b", "c"].concatHomogeneously(["a"], ["a"], ["a"]);
let m = ["a", "b", "c"].concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

//// [stringLiteralsInArrays02.js]
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


//// [stringLiteralsInArrays02.d.ts]
interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[];
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
