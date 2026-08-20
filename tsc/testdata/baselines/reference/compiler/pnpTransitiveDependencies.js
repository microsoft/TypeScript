//// [tests/cases/compiler/pnpTransitiveDependencies.ts] ////

//// [.pnp.cjs]
module.exports = {};

//// [.pnp.data.json]
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
          ["package-a", "workspace:packages/package-a"]
        ]
      }]
    ]],
    ["package-a", [
      ["workspace:packages/package-a", {
        "packageLocation": "./packages/package-a/",
        "packageDependencies": [
          ["package-b", "workspace:packages/package-b"]
        ]
      }]
    ]],
    ["package-b", [
      ["workspace:packages/package-b", {
        "packageLocation": "./packages/package-b/",
        "packageDependencies": []
      }]
    ]]
  ]
}

//// [package.json]
{
  "name": "project",
  "workspaces": [
    "packages/*"
  ],
  "dependencies": {
    "package-a": "workspace:packages/package-a"
  }
}

//// [package.json]
{
  "name": "package-a",
  "version": "1.0.0",
  "exports": {
    ".": "./index.ts"
  },
  "dependencies": {
    "package-b": "workspace:packages/package-b"
  }
}

//// [package.json]
{
  "name": "package-b",
  "version": "2.0.0",
  "exports": {
    ".": "./index.ts"
  }
}

//// [index.ts]
import type { ConfigOptions } from 'package-b';

export interface HelperResult {
  message: string;
  config: ConfigOptions;
}

export function helperA(value: string, config: ConfigOptions): HelperResult {
  return {
    message: "Helper A: " + value,
    config: config
  };
}

//// [index.ts]
export interface ConfigOptions {
  enabled: boolean;
  timeout: number;
}

export function helperB(value: number): string {
  return "Helper B: " + value;
}

//// [index.ts]
// Test that the project can import package-a directly
// package-a's types depend on package-b's types (ConfigOptions)
import { helperA } from 'package-a';
import type { HelperResult } from 'package-a';
import type { ConfigOptions } from 'package-b'; // This should error - package-b is not a direct dependency

export function useDirectDependency(text: string): HelperResult {
  const config: ConfigOptions = { enabled: true, timeout: 5000 };
  return helperA(text, config);
}

// Test that the project CANNOT import package-b directly even though package-a uses it
// This should cause an error since package-b is not in project's dependencies
export function attemptDirectImport(): ConfigOptions {
  return { enabled: false, timeout: 1000 };
}


//// [index.js]
export function helperB(value) {
    return "Helper B: " + value;
}
//// [index.js]
export function helperA(value, config) {
    return {
        message: "Helper A: " + value,
        config: config
    };
}
//// [index.js]
// Test that the project can import package-a directly
// package-a's types depend on package-b's types (ConfigOptions)
import { helperA } from 'package-a';
export function useDirectDependency(text) {
    const config = { enabled: true, timeout: 5000 };
    return helperA(text, config);
}
// Test that the project CANNOT import package-b directly even though package-a uses it
// This should cause an error since package-b is not in project's dependencies
export function attemptDirectImport() {
    return { enabled: false, timeout: 1000 };
}


//// [index.d.ts]
export interface ConfigOptions {
    enabled: boolean;
    timeout: number;
}
export declare function helperB(value: number): string;
//// [index.d.ts]
import type { ConfigOptions } from 'package-b';
export interface HelperResult {
    message: string;
    config: ConfigOptions;
}
export declare function helperA(value: string, config: ConfigOptions): HelperResult;
//// [index.d.ts]
import type { HelperResult } from 'package-a';
import type { ConfigOptions } from 'package-b';
export declare function useDirectDependency(text: string): HelperResult;
export declare function attemptDirectImport(): ConfigOptions;
