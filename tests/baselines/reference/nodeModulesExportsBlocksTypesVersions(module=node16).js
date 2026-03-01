//// [tests/cases/conformance/node/nodeModulesExportsBlocksTypesVersions.ts] ////

//// [package.json]
{
  "name": "exports-and-types-versions",
  "version": "1.0.0",
  "exports": {
    "./foo": "./dist/foo.js",
    "./yep": {
      "types": "./types/foo.d.ts",
      "default": "./dist/foo.js"
    },
    "./versioned-yep": {
      "types@>=4": "./types/foo.d.ts"
    },
    "./versioned-nah": {
      "types@<4": "./types/foo.d.ts"
    }
  },
  "typesVersions": {
    "*": {
      "foo": ["./types/foo.d.ts"],
      "nope": ["./types/foo.d.ts"],
      "versioned-nah": ["./types/foo.d.ts"]
    }
  }
}

//// [foo.js]
module.exports = {};

//// [foo.d.ts]
export {};

//// [package.json]
{
  "name": "just-types-versions",
  "version": "1.0.0",
  "typesVersions": {
    "*": {
      "foo": ["./types/foo.d.ts"]
    }
  }
}

//// [foo.d.ts]
export {};

//// [main.cts]
import {} from "exports-and-types-versions/foo";
import {} from "exports-and-types-versions/nope";
import {} from "exports-and-types-versions/yep";
import {} from "exports-and-types-versions/versioned-yep";
import {} from "exports-and-types-versions/versioned-nah";
import {} from "just-types-versions/foo";

//// [main.mts]
import {} from "exports-and-types-versions/foo";
import {} from "exports-and-types-versions/nope";
import {} from "exports-and-types-versions/yep";
import {} from "exports-and-types-versions/versioned-yep";
import {} from "exports-and-types-versions/versioned-nah";
import {} from "just-types-versions/foo";


//// [main.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.mjs]
export {};
