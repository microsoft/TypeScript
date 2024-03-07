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
export declare function drainStream(stream: NodeJS.ReadableStream): Promise<void>;


//// [DtsFileErrors]


/app.d.mts(1,45): error TS2503: Cannot find namespace 'NodeJS'.


==== /tsconfig.json (0 errors) ====
    {
      "compilerOptions": {
        "module": "nodenext",
        "types": [],
        "declaration": true,
        "emitDeclarationOnly": true,
      }
    }
    
==== /app.d.mts (1 errors) ====
    export declare function drainStream(stream: NodeJS.ReadableStream): Promise<void>;
                                                ~~~~~~
!!! error TS2503: Cannot find namespace 'NodeJS'.
    
==== /node_modules/@types/node/package.json (0 errors) ====
    {
      "name": "@types/node",
      "version": "1.0.0",
      "types": "index.d.ts"
    }
    
==== /node_modules/@types/node/globals.d.ts (0 errors) ====
    declare namespace NodeJS {
      interface ReadableStream {}
    }
    
==== /node_modules/@types/node/index.d.ts (0 errors) ====
    /// <reference path="globals.d.ts" />
    