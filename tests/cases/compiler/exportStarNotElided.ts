// @filename: register.ts
const r: any[] = [];
export function register(data: any) {
  r.push(data);
}
// @filename: data1.ts
import { register } from "./";
register("ok");
// @filename: index.ts
export * from "./register";
export * from "./data1";
export * as aliased from "./data1";