// @module: commonjs

// baseurl is defined in tsconfig.json
// module resolution kind is ambiguous - error should be reported

// @filename: root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src"
    }
}
// @filename: root/src/folder1/file1.ts
export var x = 1;