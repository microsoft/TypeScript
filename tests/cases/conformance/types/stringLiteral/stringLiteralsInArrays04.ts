// @declaration: true
// @noImplicitAny: true

interface Array<T> {
    concatHomogeneously(...arrays: T[][]): T[]
}

let a: ("a" | "b" | "c")[] = ["a", "b", "c"];
let b = a.concatHomogeneously(["a", "b", "c"]);
let c = a.concatHomogeneously(["d", "e", "f"]);
let d = a.concatHomogeneously(["a"], ["a"], ["a"]);
let e = a.concatHomogeneously(["d"], ["e"], ["f"]);
let f = a.concatHomogeneously(["a"], ["b"], ["c"]);
let g = a.concatHomogeneously(["a", "b", "c"], ["d", "e"], ["f"]);