// @module: node16,node18,nodenext
// @traceResolution: true
// @noImplicitAny: true

// @Filename: /node_modules/exports-and-types-versions/package.json
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

// @Filename: /node_modules/exports-and-types-versions/dist/foo.js
module.exports = {};

// @Filename: /node_modules/exports-and-types-versions/types/foo.d.ts
export {};

// @Filename: /node_modules/just-types-versions/package.json
{
  "name": "just-types-versions",
  "version": "1.0.0",
  "typesVersions": {
    "*": {
      "foo": ["./types/foo.d.ts"]
    }
  }
}

// @Filename: /node_modules/just-types-versions/types/foo.d.ts
export {};

// @Filename: /main.cts
import {} from "exports-and-types-versions/foo";
import {} from "exports-and-types-versions/nope";
import {} from "exports-and-types-versions/yep";
import {} from "exports-and-types-versions/versioned-yep";
import {} from "exports-and-types-versions/versioned-nah";
import {} from "just-types-versions/foo";

// @Filename: /main.mts
import {} from "exports-and-types-versions/foo";
import {} from "exports-and-types-versions/nope";
import {} from "exports-and-types-versions/yep";
import {} from "exports-and-types-versions/versioned-yep";
import {} from "exports-and-types-versions/versioned-nah";
import {} from "just-types-versions/foo";
