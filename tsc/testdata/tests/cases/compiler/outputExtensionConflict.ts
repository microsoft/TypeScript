// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "declaration": true,
        "emitDeclarationOnly": true,
        "outputExtension": ".js"
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".y.z"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /app.y.z
export declare const mapped: string;

// @Filename: /app.ts
export declare const source: string;

// @Filename: /main.ts
export { mapped } from "./app.y.z";
export { source } from "./app";
