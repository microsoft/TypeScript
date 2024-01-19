//// [tests/cases/compiler/dtsEmitTripleSlashAvoidUnnecessaryResolutionMode.ts] ////

//// [package.json]
{
  "name": "@types/node",
  "version": "1.0.0",
  "types": "index.d.ts"
}

//// [globals.d.ts]
declare namespace NodeJS {
  interface ReadableStream {}
}

//// [index.d.ts]
/// <reference path="globals.d.ts" />

//// [app.mts]
/// <reference types="node" />
export async function drainStream(stream: NodeJS.ReadableStream): Promise<void> {
}




//// [app.d.mts]
/// <reference types="node" />
export declare function drainStream(stream: NodeJS.ReadableStream): Promise<void>;
