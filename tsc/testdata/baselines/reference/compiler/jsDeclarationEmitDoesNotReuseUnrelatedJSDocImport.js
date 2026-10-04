//// [tests/cases/compiler/jsDeclarationEmitDoesNotReuseUnrelatedJSDocImport.ts] ////

//// [package.json]
{
  "name": "project",
  "private": true,
  "type": "module",
  "dependencies": {
    "external": "1.0.0"
  }
}

//// [package.json]
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

//// [index.d.ts]
export type SchemaElement = import('../src/types.d.ts').SchemaElement;

//// [types.d.ts]
export interface SchemaElement {
  name: string;
}

//// [index.js]

//// [types.d.ts]
import type { SchemaElement } from 'external';

export interface Writer {}

//// [index.js]
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




//// [index.d.ts]
export {};
//// [index.d.ts]
/**
 * @import {SchemaElement} from 'external'
 * @import {Writer} from '../src/types.js'
 */
import type { SchemaElement } from 'external';
export declare class Example {
    schema: import("external/src/types.js").SchemaElement[];
    /**
     * @param {object} options
     * @param {SchemaElement[]} options.schema
     */
    constructor({ schema }: {
        schema: SchemaElement[];
    });
}
