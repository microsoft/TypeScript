// @declaration: true
// @noImplicitAny: true

interface Array<T> {
    concatHeterogeneously<U>(...arrays: U[][]): (T | U)[]
}

const a = ["a", "b", "c"];

const b = a.concatHeterogeneously(["a", "b", "c"]);
const c = a.concatHeterogeneously(["d", "e", "f"]);
const d = a.concatHeterogeneously(["a"], ["a"], ["a"]);
const e = a.concatHeterogeneously(["d"], ["e"], ["f"]);
const f = a.concatHeterogeneously(["a"], ["b"], ["c"]);
const g = a.concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);

const h = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"]);
const i = ["a", "b", "c"].concatHeterogeneously(["d", "e", "f"]);
const j = ["a", "b", "c"].concatHeterogeneously(["a"], ["a"], ["a"]);
const k = ["a", "b", "c"].concatHeterogeneously(["d"], ["e"], ["f"]);
const l = ["a", "b", "c"].concatHeterogeneously(["a"], ["b"], ["c"]);
const m = ["a", "b", "c"].concatHeterogeneously(["a", "b", "c"], ["d", "e"], ["f"]);
