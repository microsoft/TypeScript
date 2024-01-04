// @noTypesAndSymbols: true

// @Filename: /packages/shared/package.json
{
    "name": "shared",
    "version": "1.0.0",
    "type": "module",
    "exports": "./index.js"
}

// @Filename: /packages/shared/index.js
export const x = 0;

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
        "moduleResolution": "bundler"
    }
}

// @link: /packages/shared -> /packages/main/node_modules/shared

// @Filename: /packages/main/index.ts
import { x } from "shared";
