// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "preserve",
        "rewriteRelativeImportExtensions": true,
        "allowArbitraryExtensions": true,
        "paths": { "alias": ["./actual.astro"] },
        "outDir": "/dist"
    },
    "contentMappers": [{
        "package": "mapper",
        "extensions": [".astro"],
        "outputExtensions": { ".astro": ".js" }
    }]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /components.astro/index.ts
export const directory = 1;

// @Filename: /actual.astro
export const actual = 1;

// @Filename: /ambient.d.astro.ts
export const ambient: number;

// @Filename: /main.ts
import { directory } from "./components.astro";
import { actual } from "./actual.astro";
import { ambient } from "./ambient.astro";
import { actual as aliased } from "alias";
console.log(directory, actual, ambient, aliased);
