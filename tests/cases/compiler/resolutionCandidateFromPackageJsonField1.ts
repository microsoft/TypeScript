// @filename: tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "@angular/*": ["./@angular/*"]
        }
    }
}

// @filename: @angular/core/package.json
{
    "name": "@angular/core",
    "typings": "index.d.ts"
}

// @filename: @angular/core/index.ts
export {};

// @filename: @angular/core/testing/test.ts
import "@angular/core";
