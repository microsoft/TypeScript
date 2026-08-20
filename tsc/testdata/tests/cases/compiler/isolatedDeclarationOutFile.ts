// @declaration: true
// @isolatedDeclarations: true
// @outFile: all.js
// @module: amd
// @target: ESNext

// @Filename: a.ts
export class A {
    toUpper(msg: string): string {
        return msg.toUpperCase();
    }
}

// @Filename: b.ts
import { A } from "./a";

export class B extends A {
    toFixed(n: number): string {
        return n.toFixed(6);
    }
}

export function makeB(): A {
    return new B();
}
