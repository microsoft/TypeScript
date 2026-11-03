// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "preserve",
        "declaration": true,
        "rewriteRelativeImportExtensions": true,
        "allowArbitraryExtensions": true,
        "outDir": "/dist"
    },
    "contentMappers": [{
        "package": "mapper",
        "extensions": [".toml", ".vue", ".part.toml", ".y.z"],
        "outputExtensions": { ".vue": ".part.js", ".y.z": ".js" }
    }]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /Widget.part.toml
export const config = 1;

// @Filename: /Widget.part.vue
export const component = 2;

// @Filename: /main.ts
export { config } from "./Widget.part.toml";
export { component } from "./Widget.part.vue";
export { blob } from "./blob.toml";

// @Filename: /blob.d.toml.ts
export declare const blob: number;
