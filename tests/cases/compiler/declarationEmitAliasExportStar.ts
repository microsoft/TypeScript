// @declaration: true
// @filename: thingB.ts
export interface ThingB { }
// @filename: things.ts
export * from "./thingB";
// @filename: index.ts
import * as things from "./things";
export const thing2 = (param: things.ThingB) => null;
