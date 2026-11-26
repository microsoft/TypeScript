// @target: es2020
// @strict: true

declare const f: { <T>(): T; label: string };
declare const a: { f: typeof f };

f<number>
["label"];

a?.f<number>
["label"];

a?.f<number> /*
*/ ["label"];

(f<number>)
["label"];

(a?.f<number>)["label"];
a?.f<number>?.["label"];
