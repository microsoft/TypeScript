// @Filename: /a.ts
interface I {}
export default I;

// @Filename: /b.ts
export {};
declare module './a' {
    export default interface I { x: number; }
}

// @Filename: /c.ts
import I from "./a";
function f(i: I) {
    i.x;
}
