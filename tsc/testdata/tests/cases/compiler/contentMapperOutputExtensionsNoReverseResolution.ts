// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "preserve",
        "moduleResolution": "bundler",
        "rewriteRelativeImportExtensions": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".astro"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": {
        "contentMapper": {
            "exec": ["compiler-test-mapper"],
            "outputExtensions": { ".astro": ".js" }
        }
    }
}

// @Filename: /Card.astro
export const Card = 1;

// @Filename: /main.ts
import { Card } from "./Card.js";
