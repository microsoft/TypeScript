// @declaration: true
// @noImplicitAny: true

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