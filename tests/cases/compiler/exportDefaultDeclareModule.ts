// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default declare module A {
    export const A1: number;
    export class A2 {

    }
}

// @Filename: b.ts
import A from "./a";

const namespaceAUsage = A.A1