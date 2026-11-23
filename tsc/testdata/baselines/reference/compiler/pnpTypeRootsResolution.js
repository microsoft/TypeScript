//// [tests/cases/compiler/pnpTypeRootsResolution.ts] ////

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
          ["server-lib", "npm:2.0.0"],
          ["@types/server-lib", "npm:2.0.0"]
        ]
      }]
    ]],
    ["server-lib", [
      ["npm:2.0.0", {
        "packageLocation": "./.yarn/cache/server-lib-npm-2.0.0-ijkl9012/node_modules/server-lib/",
        "packageDependencies": []
      }]
    ]],
    ["@types/server-lib", [
      ["npm:2.0.0", {
        "packageLocation": "./.yarn/cache/@types-server-lib-npm-2.0.0-mnop3456/node_modules/@types/server-lib/",
        "packageDependencies": [
          ["@types/runtime", "npm:3.0.0"]
        ]
      }]
    ]]
  ]
}

//// [package.json]
{
  "name": "project",
  "dependencies": {
    "server-lib": "2.0.0"
  },
  "devDependencies": {
    "@types/server-lib": "2.0.0",
  }
}

//// [package.json]
{
  "name": "server-lib",
  "version": "2.0.0"
}

//// [package.json]
{
  "name": "@types/server-lib",
  "version": "2.0.0",
  "types": "index.d.ts"
}

//// [index.d.ts]
export interface Request {
  params: Record<string, unknown>;
  query: Record<string, unknown>;
}

export interface Response {
  send(body: Record<string, unknown>): void;
  json(body: Record<string, unknown>): void;
}

export declare function createServer(): Record<string, unknown>;

//// [index.ts]
// Test that TypeScript can resolve @types packages through PnP
import type { Request, Response } from 'server-lib';
import { createServer } from 'server-lib';

export function handleRequest(req: Request, res: Response): void {
  res.json({ data: 'Hello, world!' });
}

export const server = createServer();


//// [index.js]
import { createServer } from 'server-lib';
export function handleRequest(req, res) {
    res.json({ data: 'Hello, world!' });
}
export const server = createServer();


//// [index.d.ts]
import type { Request, Response } from 'server-lib';
export declare function handleRequest(req: Request, res: Response): void;
export declare const server: Record<string, unknown>;
