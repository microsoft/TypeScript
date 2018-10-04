// @types: node
// @declaration: true
// @currentDirectory: /

// @filename: /node_modules/@types/node/index.d.ts
interface Error {
    stack2: string;
}

// @filename: /app.ts

function foo(): Error {
    return undefined;
}