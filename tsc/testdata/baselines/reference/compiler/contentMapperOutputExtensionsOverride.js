//// [tests/cases/compiler/contentMapperOutputExtensionsOverride.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": {
        "contentMapper": {
            "exec": ["compiler-test-mapper"],
            "outputExtensions": { ".astro": ".js" }
        }
    }
}

//// [Card.astro]
const __VERSION = "1.0.0";
export declare const Card: () => string;

//// [main.ts]
export { Card } from "./Card.astro";


//// [main.js]
export { Card } from "./Card.astro";


//// [Card.d.astro.ts]
export declare const Card: () => string;
//// [main.d.ts]
export { Card } from "./Card.astro";
