// @allowJs: true
// @outDir: ./out
// @filename: export.js
exports["a thing"] = class {
    a;
    b;
}
// @filename: usage.ts
import * as ns from "./export";

export const instance: ns."a thing" = new ns["a thing"]();