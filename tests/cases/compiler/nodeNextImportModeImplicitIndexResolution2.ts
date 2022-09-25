// @module: nodenext

// @Filename: /node_modules/@types/dedent/package.json
{ "name": "@types/dedent", "version": "1.0.0", "main": "" }

// @Filename: /node_modules/@types/dedent2/package.json
{ "name": "@types/dedent2", "version": "1.0.0", "main": "asdfasdfasdf" }

// @Filename: /node_modules/@types/dedent3/package.json
{ "name": "@types/dedent3", "version": "1.0.0", "main": "asdfasdfasdf", "exports": null }

// @Filename: /node_modules/@types/dedent4/package.json
{ "name": "@types/dedent4", "version": "1.0.0", "main": "asdfasdfasdf", "exports": "./asdfasdfasdf" }

// @Filename: /node_modules/@types/dedent/index.d.ts
export {};

// @Filename: /node_modules/@types/dedent2/index.d.ts
export {};

// @Filename: /node_modules/@types/dedent3/index.d.ts
export {};

// @Filename: /node_modules/@types/dedent4/index.d.ts
export {};

// @Filename: /index.mts
import dedent from "dedent";
import dedent2 from "dedent2";
import dedent3 from "dedent3";
import dedent4 from "dedent4"; // Error

// @Filename: /index.cts
import dedent from "dedent";
import dedent2 from "dedent2";
import dedent3 from "dedent3";
import dedent4 from "dedent4"; // Error
