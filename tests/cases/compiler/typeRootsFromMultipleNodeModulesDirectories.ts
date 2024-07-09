// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory: /src

// @Filename: /node_modules/@types/dopey/index.d.ts
declare module "xyz" {
    export const x: number;
}

// @Filename: /foo/node_modules/@types/grumpy/index.d.ts
declare module "pdq" {
    export const y: number; 
}

// @Filename: /foo/node_modules/@types/sneezy/index.d.ts
declare module "abc" {
    export const z: number;
}

// @Filename: /foo/bar/a.ts
import { x } from "xyz";
import { y } from "pdq";
import { z } from "abc";
x + y + z;

// @Filename: /foo/bar/tsconfig.json
{}
