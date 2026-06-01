// @module: preserve
// @moduleResolution: bundler
// @noEmit: true
// @traceResolution: true

// @filename: tsconfig.json
{
    "compilerOptions": {
        "module": "preserve",
        "moduleResolution": "bundler",
        "paths": {
            "react": ["./node_modules/preact/compat/"]
        },
        "noEmit": true
    },
    "files": ["./app.ts"]
}

// @filename: node_modules/preact/compat/package.json
{
    "name": "preact-compat",
    "version": "1.0.0",
    "types": "./index.d.ts"
}

// @filename: node_modules/preact/compat/index.d.ts
export declare function createElement(type: string): any;
export declare function useState<T>(initial: T): [T, (v: T) => void];

// @filename: node_modules/@types/react/package.json
{
    "name": "@types/react",
    "version": "18.0.0",
    "types": "./index.d.ts"
}

// @filename: node_modules/@types/react/index.d.ts
export declare function createElement(type: string): any;
export declare function useState<T>(initial: T): [T, (v: T) => void];

// @filename: app.ts
import { useState } from "react";

// Verify that paths resolution resolves to preact/compat, not @types/react.
// The trailing slash in the paths config ("./node_modules/preact/compat/")
// must not cause cache mismatches in concurrent builds.
const [count, setCount] = useState(0);
setCount(count + 1);
