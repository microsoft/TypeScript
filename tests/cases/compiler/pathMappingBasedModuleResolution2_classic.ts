// @module: amd
// @traceResolution: true

// baseurl is defined in tsconfig.json
// paths has errors

// @filename: root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "*1*": [ "*2*" ]
        },
        "ignoreDeprecations": "6.0"
    }
}

// @filename: root/src/folder1/file1.ts
export var x = 1;