//// [tests/cases/compiler/resolutionCandidateFromPackageJsonField1.ts] ////

//// [package.json]
{
    "name": "@angular/core",
    "typings": "index.d.ts"
}

//// [index.ts]
export {};

//// [test.ts]
import "@angular/core";


//// [index.js]
export {};
//// [test.js]
import "@angular/core";
