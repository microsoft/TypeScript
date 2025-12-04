//// [tests/cases/conformance/externalModules/typeOnly/typeOnlyESMImportFromCJS.ts] ////

//// [module.mts]
export {};

//// [common.cts]
import type {} from "./module.mts";
import type {} from "./module.mts" with { "resolution-mode": "import" };
import type {} from "./module.mts" with { "resolution-mode": "require" };
type _1 = typeof import("./module.mts");
type _2 = typeof import("./module.mts", { with: { "resolution-mode": "import" } });
type _3 = typeof import("./module.mts", { with: { "resolution-mode": "require" } });


//// [module.mjs]
export {};
//// [common.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
