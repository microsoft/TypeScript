// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory: /src

// @Filename: /node_modules/@types/foo/index.d.ts
declare module "xyz" {
    export const x: number;
}

// @Filename: /src/a.ts
import { x } from "xyz";
x;

// @Filename: /src/tsconfig.json
{}
