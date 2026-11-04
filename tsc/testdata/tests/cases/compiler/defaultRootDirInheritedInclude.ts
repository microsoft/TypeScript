// @currentDirectory: /project

// @filename: /project/example/tsconfig.json
{
    "extends": "../tsconfig.json"
}

// @filename: /project/tsconfig.json
{
    "compilerOptions": {
        "outDir": "lib"
    },
    "include": ["src"]
}

// @filename: /project/src/index.ts
export const value = 0;
