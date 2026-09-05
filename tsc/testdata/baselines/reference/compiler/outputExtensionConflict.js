//// [tests/cases/compiler/outputExtensionConflict.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [app.y.z]
const __VERSION = "1.0.0";
export declare const mapped: string;

//// [app.ts]
export declare const source: string;

//// [main.ts]
export { mapped } from "./app.y.z";
export { source } from "./app";




//// [main.d.ts]
export { mapped } from "./app.js";
export { source } from "./app";
