// @module: node18,nodenext

// @Filename: module.mts
export {};

// @Filename: common.cts
import type {} from "./module.mts";
import type {} from "./module.mts" with { "resolution-mode": "import" };
import type {} from "./module.mts" with { "resolution-mode": "require" };
type _1 = typeof import("./module.mts");
type _2 = typeof import("./module.mts", { with: { "resolution-mode": "import" } });
type _3 = typeof import("./module.mts", { with: { "resolution-mode": "require" } });
