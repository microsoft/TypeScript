// @Filename: /tsconfig.json
{
"compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationDir": "./types",
    "checkJs": true,
    "rootDir": ".",
    "strict": true,
    "moduleResolution": "node16" // Ensures compatibility with Node's module resolution rules
  },
  "include": ["src", "test"]
}

// @Filename: /package.json
{
  "name": "js-self-name-import",
  "type": "module",
  "exports": {
  "./src/*": {
    "types": "./types/src/*",
    "default": "./src/*"
  },
  "./test/*": {
    "types": "./types/test/*",
    "default": "./test/*"
  }
}
}

// @Filename: /types/src/foo.d.ts
export const foo: 1;

// @Filename: /types/test/foo.d.ts
export {};

// @Filename: /src/foo.js
export const foo = 1;

// @Filename: /test/foo.js
import { foo } from "js-self-name-import/foo.js";
