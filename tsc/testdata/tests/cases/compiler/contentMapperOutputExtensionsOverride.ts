// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "declaration": true
    },
    "contentMappers": [
        {
            "package": "mapper",
            "extensions": [".astro"],
            "outputExtensions": { ".astro": ".astro" }
        }
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
export declare const Card: () => string;

// @Filename: /main.ts
export { Card } from "./Card.astro";
