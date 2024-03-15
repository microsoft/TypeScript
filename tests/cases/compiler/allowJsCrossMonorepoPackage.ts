// @Filename: /node_modules/pkg/index.d.ts
export declare function pkg(): "pkg";

// @Filename: /packages/shared/package.json
{
    "name": "shared",
    "version": "1.0.0",
    "type": "module",
    "exports": "./index.js"
}

// @Filename: /packages/shared/utils.js
export { pkg } from "pkg";

// @Filename: /packages/shared/index.js
import { pkg } from "./utils.js";
export const x = pkg();

// @Filename: /packages/main/package.json
{
    "name": "main",
    "version": "1.0.0",
    "type": "module",
    "dependencies": {
        "shared": "workspace:*"
    }
}

// @Filename: /packages/main/tsconfig.json
{
    "compilerOptions": {
        "noEmit": true,
        "checkJs": true,
        "strict": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "traceResolution": true,
    }
}

// @link: /packages/shared -> /packages/main/node_modules/shared

// @Filename: /packages/main/index.ts
import { x } from "shared";
