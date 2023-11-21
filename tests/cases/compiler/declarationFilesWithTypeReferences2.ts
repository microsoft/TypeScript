// @types: node
// @declaration: true
// @currentDirectory: /
// @isolatedDeclarationDiffReason: TSC adds type reference directives.

// @filename: /node_modules/@types/node/index.d.ts
interface Error2 {
    stack2: string;
}

// @filename: /app.ts

function foo(): Error2 {
    return undefined;
}