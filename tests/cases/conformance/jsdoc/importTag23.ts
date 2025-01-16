// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "noEmit": true,
        "allowJs": true,
        "checkJs": true,
        "baseUrl": ".",
        "paths": {
            "ns/*": ["src/*"]
        }
    },
    "files": ["src/bar.js"]
}

// @Filename: /src/foo.ts
export default interface Foo {
    a: number;
}

// @Filename: /src/bar.js
/** @import Foo from "ns/foo" */

/** @return {Foo} */
function f() {
    return { a: "" };
}
