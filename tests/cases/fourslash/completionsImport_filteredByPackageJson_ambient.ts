/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "dependencies": {
////  }
////}

//@Filename: /node_modules/@types/node/timers.d.ts
////declare module "timers" {
////  function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timeout;
////}

//@Filename: /node_modules/@types/node/package.json
////{
////  "name": "@types/node",
////}

//@Filename: /src/index.ts
////setTimeo/**/

verify.completions({
  marker: test.marker(""),
  exact: completion.globals,
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
