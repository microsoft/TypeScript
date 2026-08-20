// @strict: true

// @filename: /.pnp.cjs
module.exports = {};

// @filename: /.pnp.data.json
{
  "dependencyTreeRoots": [
    {
      "name": "project",
      "reference": "workspace:."
    }
  ],
  "ignorePatternData": null,
  "enableTopLevelFallback": false,
  "fallbackPool": [],
  "fallbackExclusionList": [],
  "packageRegistryData": [
    ["project", [
      ["workspace:.", {
        "packageLocation": "./",
        "packageDependencies": [
          ["package-a", "npm:1.0.0"],
          ["package-b", "npm:2.0.0"]
        ]
      }]
    ]],
    ["package-a", [
      ["npm:1.0.0", {
        "packageLocation": "./.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/",
        "packageDependencies": []
      }]
    ]],
    ["package-b", [
      ["npm:2.0.0", {
        "packageLocation": "./.yarn/cache/package-b-npm-2.0.0-efgh5678/node_modules/package-b/",
        "packageDependencies": []
      }]
    ]]
  ]
}

// @filename: package.json
{
  "name": "project",
  "dependencies": {
    "package-a": "npm:1.0.0",
    "package-b": "npm:2.0.0"
  }
}

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/package.json
{
  "name": "package-a",
  "version": "1.0.0",
  "exports": {
    ".": "./index.js"
  },
  "types": "index.d.ts"
}

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/index.d.ts
export declare function helperA(value: string): string;

// @filename: /.yarn/cache/package-b-npm-2.0.0-efgh5678/node_modules/package-b/package.json
{
  "name": "package-b", 
  "version": "2.0.0",
  "exports": {
    ".": "./index.js"
  },
  "types": "index.d.ts"
}

// @filename: /.yarn/cache/package-b-npm-2.0.0-efgh5678/node_modules/package-b/index.d.ts
export declare function helperB(value: number): string;

// @filename: /tsconfig.json
{
  "exclude": [".pnp.cjs"],
  "compilerOptions": {
    "rootDir": ".",
    "declaration": true,
    "outDir": "./dist"
  }
}

// @filename: /src/index.ts
// Workspace package that imports both third-party dependencies
import { helperA } from 'package-a';
import { helperB } from 'package-b';

export function processData(text: string, num: number): string {
  const resultA = helperA(text);
  const resultB = helperB(num);
  return `${resultA} | ${resultB}`;
}