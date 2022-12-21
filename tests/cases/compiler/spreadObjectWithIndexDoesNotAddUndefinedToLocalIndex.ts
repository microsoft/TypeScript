// @strict: true
declare const m: { [k: string]: string };
const x: { [k: string]: string } = { ...m, ["a" + "b"]: "" };