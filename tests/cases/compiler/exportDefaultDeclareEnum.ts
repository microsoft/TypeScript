// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default declare enum A { FOO }

// @Filename: b.ts
import A from "./a";

const x = A.FOO;