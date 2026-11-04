//// [tests/cases/compiler/defaultRootDirInheritedInclude.ts] ////

//// [tsconfig.json]
{
    "compilerOptions": {
        "outDir": "lib"
    },
    "include": ["src"]
}

//// [index.ts]
export const value = 0;


//// [index.js]
export const value = 0;
