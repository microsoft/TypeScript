// @Filename: /b.ts
export const x = 1;

// @Filename: /a.ts
export function f(x: typeof import("./b").nope.x) {}
