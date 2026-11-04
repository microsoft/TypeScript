// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "preserve",
        "rewriteRelativeImportExtensions": true,
        "declaration": true,
        "rootDir": "/",
        "outDir": "/dist"
    },
    "contentMappers": [{
        "package": "mapper",
        "extensions": [".z", ".y.z", ".identity.y.z", ".unmapped.y.z"],
        "outputExtensions": {
            ".z": ".js",
            ".y.z": ".mjs",
            ".identity.y.z": ".identity.y.z"
        }
    }]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /Widget.z
export const short = 1;

// @Filename: /Widget.y.z
export const long = 1;

// @Filename: /Widget.identity.y.z
export const identity = 1;

// @Filename: /Widget.unmapped.y.z
export const unmapped = 1;

// @Filename: /main.ts
export { short } from "./Widget.z";
export { long } from "./Widget.y.z";
export { identity } from "./Widget.identity.y.z";
export { unmapped } from "./Widget.unmapped.y.z";
export function literal() { return import("./Widget.y.z"); }
export function dynamic(path: string) { return import(path); }
export const inferred = import("./Widget.y.z");
