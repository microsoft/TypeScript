//// [tests/cases/compiler/pnpDeclarationEmitWorkspace.ts] ////

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
    "package-a": "workspace:*"
  }
}

//// [package.json]
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

//// [index.d.ts]
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

//// [index.js]
exports.initializeService = function(url) {};


//// [index.ts]
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


//// [index.js]
import { createServiceConfig } from 'package-a/other-subpath';
export function initializeService(url) {
    return createServiceConfig(url);
}
export const factory = createServiceConfig;


//// [index.d.ts]
import type { ServiceConfig } from 'package-a/other-subpath';
import { createServiceConfig } from 'package-a/other-subpath';
export declare function initializeService(url: string): ServiceConfig;
export declare const factory: typeof createServiceConfig;
export interface AppConfig {
    service: ServiceConfig;
    debug: boolean;
}
