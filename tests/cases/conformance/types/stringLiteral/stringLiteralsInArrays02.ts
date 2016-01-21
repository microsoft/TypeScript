// @declaration: true
// @noImplicitAny: true

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