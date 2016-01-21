// @declaration: true
// @noImplicitAny: true

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