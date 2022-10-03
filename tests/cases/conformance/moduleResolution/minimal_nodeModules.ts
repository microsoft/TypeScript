// @moduleResolution: minimal

// @Filename: /node_modules/foo/index.d.ts
import {} from "./other.js";
export {};

// @Filename: /node_modules/foo/other.d.ts
export {};

// @Filename: /node_modules/@types/foo/index.d.ts
export {};

// @Filename: /main.ts
import {} from "foo";
import {} from "./node_modules/foo/index.js";
import type {} from "./node_modules/@types/foo/index.d.ts";
