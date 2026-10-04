// @noEmit: true
// @noTypesAndSymbols: true
// @module: nodenext
// @moduleResolution: nodenext
// @filename: src/a.ts
import * as b from "#/b.";

b.foo();

// @filename: src/b.ts
export function foo() {}

// @filename: package.json
{
    "imports": {
        "#/*": {
            "types": "./src/*ts",
            "default": "./dist/*js"
        }
    }
}

// @filename: tsconfig.json
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}
