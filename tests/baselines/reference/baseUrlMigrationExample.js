//// [tests/cases/compiler/baseUrlMigrationExample.ts] ////

//// [tsconfig.json]
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

//// [module.ts]
export const value = 42;

//// [utils.ts]
export function helper() { return "help"; }

//// [main.ts]
import { value } from "@app/module";
import { helper } from "@lib/utils";
// With explicit catch-all mapping, this still works:
import * as something from "someModule"; // Resolves to ./src/someModule

//// [someModule.ts]
export const data = "from explicit path mapping";
//// [module.ts]
export const value = 42;

//// [utils.ts]
export function helper() { return "help"; }

//// [main.ts]
import { value } from "@app/module";
import { helper } from "@lib/utils";
// This would also resolve due to baseUrl:
import * as something from "someModule"; // Resolves to ./src/someModule

//// [someModule.ts]
export const data = "from baseUrl resolution";


//// [module.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = void 0;
exports.value = 42;
//// [utils.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = helper;
function helper() { return "help"; }
//// [someModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.data = "from baseUrl resolution";
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
