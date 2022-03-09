type T1 = "string" | "number" | "boolean";
type T2 = T1 & ("number" | "boolean"); // "number" | "boolean"
type T3 = T1 & ("string" | "boolean"); // "string" | "boolean"

const t1: T1 = "strong";
const t2: T2 = "strong";
const t3: T3 = "strong";
