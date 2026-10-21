// @filename: /tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "noEmit": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "types": [],
        "paths": {
            "script.svelte": ["./stub.d.ts"],
            "module.svelte": ["./module.d.ts"]
        },
        "rootDirs": ["./src", "./generated"]
    },
    "files": ["ambient.d.ts", "src/main.ts"]
}

// @filename: /ambient.d.ts
declare module "*.svelte" {
    const c: number;
    export default c;
}

// @filename: /stub.d.ts
// A script, not a module.

// @filename: /generated/relative.svelte.d.ts
// A script, not a module.

// @filename: /module.d.ts
declare const c: string;
export default c;

// @filename: /src/main.ts
import script from "script.svelte";
const scriptValue: string = script;

import relative from "./relative.svelte";
const relativeValue: string = relative;

import resolved from "module.svelte";
const resolvedValue: string = resolved;

import missing from "missing.svelte";
const missingValue: number = missing;
