// @module: esnext
// @moduleResolution: bundler
// @moduleFormatInterop: bundlernode

// @Filename: /node_modules/dep/package.json
{
    "name": "dep",
    "version": "1.0.0",
    "type": "module",
    "main": "index.js"
}

// @Filename: /node_modules/dep/index.d.ts
export declare const foo: string;

// @Filename: /index.ts
import dep from "dep"; // Error
dep.foo;
