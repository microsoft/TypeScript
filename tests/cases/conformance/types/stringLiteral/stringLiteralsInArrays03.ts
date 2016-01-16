// @declaration: true
// @noImplicitAny: true

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