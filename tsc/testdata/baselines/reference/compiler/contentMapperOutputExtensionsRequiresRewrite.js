//// [tests/cases/compiler/contentMapperOutputExtensionsRequiresRewrite.ts] ////

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
export const Card = 1;




//// [Card.d.ts]
export declare const Card = 1;
