// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55340

declare const a: Array<number | string>;
const b: Array<number> = [...a, 1];

// https://github.com/microsoft/TypeScript/issues/58110
type Abc = "a" | "b" | "c";
const array1: Abc[] = ["a", "b"];
const array2: Abc[] = [...array1, "a", "b", "d"];
