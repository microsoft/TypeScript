// A static namespace import and a dynamic import expose the same ESM module.
// @target: esnext
// @module: nodenext
// @moduleResolution: nodenext
// @noEmit: true
// @strict: true

// @filename: /pkg.d.mts
export default 0;

// @filename: /main.mts
import type * as packageTypes from "./pkg.mjs";

const packageModule = true ? packageTypes : await import("./pkg.mjs");
