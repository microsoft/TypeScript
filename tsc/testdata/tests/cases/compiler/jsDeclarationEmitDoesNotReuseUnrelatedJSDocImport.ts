// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @module: nodenext
// @outDir: /out
// @strict: true
// @currentDirectory: /
// @noTypesAndSymbols: true

// @filename: /package.json
{
  "name": "project",
  "private": true,
  "type": "module",
  "dependencies": {
    "external": "1.0.0"
  }
}

// @filename: /node_modules/external/package.json
{
  "name": "external",
  "version": "1.0.0",
  "type": "module",
  "types": "types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "default": "./src/index.js"
    },
    "./src/*.js": {
      "types": "./src/*.d.ts",
      "default": "./src/*.js"
    }
  }
}

// @filename: /node_modules/external/types/index.d.ts
export type SchemaElement = import('../src/types.d.ts').SchemaElement;

// @filename: /node_modules/external/src/types.d.ts
export interface SchemaElement {
  name: string;
}

// @filename: /node_modules/external/src/index.js

// @filename: /src/types.d.ts
import type { SchemaElement } from 'external';

export interface Writer {}

// @filename: /src/index.js
/**
 * @import {SchemaElement} from 'external'
 * @import {Writer} from '../src/types.js'
 */

export class Example {
  /**
   * @param {object} options
   * @param {SchemaElement[]} options.schema
   */
  constructor({ schema }) {
    this.schema = schema;
  }
}
