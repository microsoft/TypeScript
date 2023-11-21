// @declaration: true
// @isolatedDeclarationFixedDiffReason: Function declarations are not fixed
// @filename: a.ts
interface I {}
export function f(): I { return null as I; }
// @filename: b.ts
import {f} from "./a";

export function q() {}
q.val = f();
