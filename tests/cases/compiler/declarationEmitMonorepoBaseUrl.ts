// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "declaration": true,
    "outDir": "temp",
    "baseUrl": "."
  }
}

// @Filename: /node_modules/.pnpm/@babel+parser@7.23.6/node_modules/@babel/parser/package.json
{
  "name": "@babel/parser",
  "version": "7.23.6",
  "main": "./lib/index.js",
  "types": "./typings/babel-parser.d.ts"
}

// @Filename: /node_modules/.pnpm/@babel+parser@7.23.6/node_modules/@babel/parser/typings/babel-parser.d.ts
export declare function createPlugin(): PluginConfig;
export declare class PluginConfig {}

// @Filename: /packages/compiler-core/package.json
{
  "name": "@vue/compiler-core",
  "version": "3.0.0",
  "main": "./src/index.ts",
  "dependencies": {
    "@babel/parser": "^7.0.0"
  }
}

// @Filename: /packages/compiler-core/src/index.ts
import { PluginConfig } from "@babel/parser";

// @Filename: /packages/compiler-sfc/package.json
{
  "name": "@vue/compiler-sfc",
  "version": "3.0.0",
  "main": "./src/index.ts",
  "dependencies": {
    "@babel/parser": "^7.0.0",
    "@vue/compiler-core": "^3.0.0"
  }
}

// @Filename: /packages/compiler-sfc/src/index.ts
import { createPlugin } from "@babel/parser";
export function resolveParserPlugins() {
  return [createPlugin()];
}

// @link: /node_modules/.pnpm/@babel+parser@7.23.6/node_modules/@babel/parser -> /node_modules/@babel/parser
// @link: /node_modules/.pnpm/@babel+parser@7.23.6/node_modules/@babel/parser -> /packages/compiler-core/node_modules/@babel/parser
// @link: /node_modules/.pnpm/@babel+parser@7.23.6/node_modules/@babel/parser -> /packages/compiler-sfc/node_modules/@babel/parser