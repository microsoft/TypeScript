// @declaration: true

// @filename: /a/node_modules/@types/node/index.d.ts
interface Error {
    stack2: string;
}

// @filename: /a/app.ts
/// <reference types="node"/>
function foo(): Error {
    return undefined;
}