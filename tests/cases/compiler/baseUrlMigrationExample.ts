// @typeScriptVersion: 6.0
// Test showing the recommended migration from baseUrl to explicit path mappings

// @filename: /before/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "@app/*": ["app/*"],
            "@lib/*": ["lib/*"]
        }
    }
}

// @filename: /before/src/app/module.ts
export const value = 42;

// @filename: /before/src/lib/utils.ts
export function helper() { return "help"; }

// @filename: /before/src/main.ts
import { value } from "@app/module";
import { helper } from "@lib/utils";
// This would also resolve due to baseUrl:
import * as something from "someModule"; // Resolves to ./src/someModule

// @filename: /before/src/someModule.ts
export const data = "from baseUrl resolution";

// @filename: /after/tsconfig.json
{
    "compilerOptions": {
        "paths": {
            // Explicit prefix for all path mappings
            "@app/*": ["./src/app/*"],
            "@lib/*": ["./src/lib/*"],
            // Optional: preserve baseUrl behavior with catch-all
            "*": ["./src/*"]
        }
    }
}

// @filename: /after/src/app/module.ts
export const value = 42;

// @filename: /after/src/lib/utils.ts
export function helper() { return "help"; }

// @filename: /after/src/main.ts
import { value } from "@app/module";
import { helper } from "@lib/utils";
// With explicit catch-all mapping, this still works:
import * as something from "someModule"; // Resolves to ./src/someModule

// @filename: /after/src/someModule.ts
export const data = "from explicit path mapping";