//// [tests/cases/compiler/contentMapperSingleDotExtensions.ts] ////

//// [package.json]
{
    "name": "mapper",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [Widget.part.toml]
const __VERSION = "1.0.0";
export const config = 1;

//// [Widget.part.vue]
const __VERSION = "1.0.0";
export const component = 2;

//// [main.ts]
export { config } from "./Widget.part.toml";
export { component } from "./Widget.part.vue";
export { blob } from "./blob.toml";

//// [blob.d.toml.ts]
export declare const blob: number;


//// [main.js]
export { config } from "./Widget.part.toml";
export { component } from "./Widget.part.part.js";
export { blob } from "./blob.toml";


//// [Widget.part.d.toml.ts]
export declare const config = 1;
//// [Widget.part.part.d.ts]
export declare const component = 2;
//// [main.d.ts]
export { config } from "./Widget.part.toml";
export { component } from "./Widget.part.part.js";
export { blob } from "./blob.toml";
