// @declaration: true
// @noImplicitAny: true


// @filename: file1.ts
export const a = "A";
export const b = "B";

// @filename: file2.ts
import * as file1 from "file1";

const a: "A" = file1.a;
const b: "B" = file1.b;

let aOrB: "A" | "B";
aOrB = file1.a;
aOrB = file1.b;
