// @runExternalCode: true
// @module: preserve, commonjs

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "rewriteRelativeImportExtensions": true,
        "importHelpers": true,
        "allowJs": true,
        "checkJs": true,
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

// @Filename: /node_modules/tslib/package.json
{ "name": "tslib", "types": "index.d.ts" }

// @Filename: /node_modules/tslib/index.d.ts
export declare function __rewriteRelativeImportExtension(
    path: any,
    preserveJsx?: boolean,
    extraExtensions?: Record<string, string>,
    ignoreCase?: boolean
): any;

// @Filename: /Card.astro
export const Card = 1;

// @Filename: /main.ts
export function dynamic(path: string) { return import(path); }
export function literal() { return import("./Card.astro"); }

// @Filename: /require.js
/** @param {string} path */
export function dynamicRequire(path) { return require(path); }

// @Filename: /globals.d.ts
declare function require(path: string): unknown;
