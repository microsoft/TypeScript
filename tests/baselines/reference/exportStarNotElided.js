//// [tests/cases/compiler/exportStarNotElided.ts] ////

//// [register.ts]
const r: any[] = [];
export function register(data: any) {
  r.push(data);
}
//// [data1.ts]
import { register } from "./";
register("ok");
//// [index.ts]
export * from "./register";
export * from "./data1";
export * as aliased from "./data1";

//// [register.js]
const r = [];
export function register(data) {
    r.push(data);
}
//// [index.js]
export * from "./register";
export * from "./data1";
import * as aliased_1 from "./data1";
export { aliased_1 as aliased };
//// [data1.js]
import { register } from "./";
register("ok");
