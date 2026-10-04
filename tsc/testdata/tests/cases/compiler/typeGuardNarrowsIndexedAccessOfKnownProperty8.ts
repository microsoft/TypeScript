// @strict: true
// @target: esnext

// @filename: ./a.ts
export const key = "a";

// @filename: ./b.ts
import * as a from "./a";
export class C {
    [a.key]: string;

    constructor() {
        this[a.key] = "foo";
    }
}
