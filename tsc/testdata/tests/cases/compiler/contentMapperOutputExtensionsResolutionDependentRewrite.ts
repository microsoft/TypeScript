// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "preserve",
        "moduleResolution": "bundler",
        "rewriteRelativeImportExtensions": true,
        "allowArbitraryExtensions": true,
        "declaration": true,
        "rootDirs": ["src", "generated"],
        "moduleSuffixes": [".native", ""],
        "outDir": "/dist"
    },
    "contentMappers": [{
        "package": "mapper",
        "extensions": [".toml", ".identity", ".part.toml"],
        "include": ["generated", "**/*.native.toml", "src/allowed", "src/declaration.toml"],
        "outputExtensions": { ".toml": ".js", ".part.toml": ".part.js" }
    }, {
        "package": "mapper",
        "extensions": [".toml"],
        "include": ["src/second"],
        "outputExtensions": { ".toml": ".js" }
    }]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /generated/root.toml
export class Root {}
export interface TypeOnly {}
export function make() { return new Root(); }

// @Filename: /src/suffixed.native.toml
export const suffixed = 1;

// @Filename: /generated/allowed/blob.toml
export const allowed = 1;

// @Filename: /generated/second/blob.part.toml
export const second = 1;

// @Filename: /generated/blob.identity
export const identity = 1;

// @Filename: /generated/declaration.d.toml.ts
export const declaration: number;

// @Filename: /src/main.ts
import { make } from "./root.toml";
import type { TypeOnly } from "./root.toml";
export { suffixed } from "./suffixed.toml";
export { allowed } from "./allowed/blob.toml";
export { second } from "./second/blob.part.toml";
export { identity } from "./blob.identity";
export { declaration } from "./declaration.toml";
export type { TypeOnly as ExportedType } from "./root.toml";
export const root = make();
export const load = () => import("./root.toml");
export type RootType = import("./root.toml").Root;
export type DirectType = TypeOnly;
