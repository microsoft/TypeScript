// @declaration: true
// @filename: root.ts
export function getSomething(): Something { return null as any }
export default class Something {}
// @filename: main.ts
import Thing, { getSomething } from "./root";
export const instance = getSomething();
