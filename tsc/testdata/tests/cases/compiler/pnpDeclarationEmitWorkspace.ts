// @strict: true
// @declaration: true
// @currentDirectory: /src

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
          ["package-a", "workspace:packages/package-a"]
        ]
      }]
    ]],
    ["package-a", [
      ["workspace:packages/package-a", {
        "packageLocation": "./packages/package-a/",
        "packageDependencies": []
      }]
    ]]
  ]
}

// @filename: /package.json
{
  "name": "project",
  "workspaces": [
    "packages/*"
  ],
  "dependencies": {
    "package-a": "workspace:*"
  }
}

// @filename: /tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}

// @filename: /packages/package-a/package.json
{
  "name": "package-a",
  "exports": {
    "./other-subpath": {
      "types": "./index.d.ts",
      "default": "./index.js"
    }
  },
  "dependencies": {
    "package-b": "workspace:*"
  }
}

// @filename: /packages/package-a/index.d.ts
export interface BaseConfig {
  timeout: number;
  retries: number;
}

export interface DataOptions {
  format: "json" | "xml";
  encoding: string;
}

export interface ServiceConfig extends BaseConfig {
  endpoint: string;
  options: DataOptions;
}

export type ConfigFactory = (endpoint: string) => ServiceConfig;

export declare function createServiceConfig(endpoint: string): ServiceConfig;

// @filename: /packages/package-a/index.js
exports.initializeService = function(url) {};


// @filename: /src/index.ts
import type { ServiceConfig, ConfigFactory } from 'package-a/other-subpath';
import { createServiceConfig } from 'package-a/other-subpath';

export function initializeService(url: string): ServiceConfig {
  return createServiceConfig(url);
}

export const factory = createServiceConfig;

export interface AppConfig {
  service: ServiceConfig;
  debug: boolean;
}
