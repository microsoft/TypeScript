// @strict: true
// @module: esnext
// @moduleResolution: bundler
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: /tsconfig.json
{
    "compilerOptions": {
        "rootDirs": ["./src", "./generated"]
    },
    "files": ["ambient.d.ts", "src/main.ts"]
}

// @filename: /ambient.d.ts
declare module "*.svelte" {
    const value: number;
    export default value;
}
declare module "*.svelte" with { type: "text" } {
    const value: string;
    export default value;
}
declare module "*.js" {
    const value: number;
    export default value;
}

// @filename: /stub.d.ts
// This file is not resolved without a paths mapping.

// @filename: /generated/component.svelte.d.ts
// A script resolved through rootDirs.

// @filename: /src/script.ts
// A script resolved through a relative import.

// @filename: /src/main.ts
import fromPaths from "x.svelte";
import emptyAttributes from "x.svelte" with {};
import fromRootDirs from "./component.svelte";
import fromRelative from "./script.js";
const fromPathsValue: string = fromPaths;

import text from "x.svelte" with { type: "text" };
const textValue: string = text;

import missing from "./missing.svelte";
const missingValue: number = missing;
