// @declaration: true
// @filename: thingA.ts
export interface ThingA { }
// @filename: thingB.ts
export interface ThingB { }
// @filename: things.ts
export { ThingA } from "./thingA";
export * from "./thingB";
// @filename: index.ts
import * as things from "./things";
export const thing1 = (param: things.ThingA) => null;
export const thing2 = (param: things.ThingB) => null;
