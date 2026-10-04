//// [tests/cases/conformance/moduleResolution/resolutionModeTripleSlash2.ts] ////

//// [package.json]
{
  "name": "@types/foo",
  "version": "1.0.0",
  "exports": {
    ".": {
      "import": "./index.d.mts",
      "require": "./index.d.cts"
    }
  }
}

//// [index.d.mts]
export {};
declare global {
  const MODULE: any;
}

//// [index.d.cts]
export {};
declare global {
  const SCRIPT: any;
}

//// [app.ts]
/// <reference types="foo" resolution-mode="require" />
MODULE; // error
SCRIPT; // ok
function foo() {
    return SCRIPT;
}



//// [app.d.ts]
declare function foo(): any;
