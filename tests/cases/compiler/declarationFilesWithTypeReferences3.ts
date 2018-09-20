// @declaration: true

// @filename: /a/node_modules/@types/node/index.d.ts
interface Error2 {
    stack2: string;
}

// @filename: /a/app.ts
/// <reference types="node"/>
function foo(): Error2 {
    return undefined;
}