// @declaration: true
// @noImplicitAny: true

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