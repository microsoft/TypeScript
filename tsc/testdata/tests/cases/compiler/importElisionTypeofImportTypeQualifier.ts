// @Filename: /b.ts
export namespace ns { export const y = 1; }

// @Filename: /c.ts
export namespace ns { export const y = 2; }

// @Filename: /a.ts
import { ns } from "./c";
export function f(x: typeof import("./b").ns.y) {}
