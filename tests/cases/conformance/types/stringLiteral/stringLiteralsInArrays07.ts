// @declaration: true
// @noImplicitAny: true

interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[]
}

const a: ("a" | "b" | "c")[] = ["a", "b", "c"];
const b = a.concatHeterogeneously(["a", "b", "c"]);
const c = a.concatHeterogeneously(["d", "e", "f"]);
const d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
const e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
const f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
const g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);