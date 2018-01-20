// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: int.ts
export default type int = number

// @Filename: b.ts
import int from "./int";

const intUsage: int = 23;