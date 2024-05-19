// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "types": [],
    "declaration": true,
    "emitDeclarationOnly": true,
  }
}

// @Filename: /node_modules/@types/node/package.json
{
  "name": "@types/node",
  "version": "1.0.0",
  "types": "index.d.ts"
}

// @Filename: /node_modules/@types/node/globals.d.ts
declare namespace NodeJS {
  interface ReadableStream {}
}

// @Filename: /node_modules/@types/node/index.d.ts
/// <reference path="globals.d.ts" />

// @Filename: /app.mts
/// <reference types="node" preserve="true" />
export async function drainStream(stream: NodeJS.ReadableStream): Promise<void> {
}
