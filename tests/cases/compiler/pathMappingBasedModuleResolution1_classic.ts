// @module: amd
// @traceResolution: true

// paths should error in the absence of baseurl

// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "*": [
                "*",
                "generated/*"
            ]
        }
    }
}

// @filename: c:/root/f1.ts
export var x = 1;
