currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
<template>hi</template>
//// [/home/src/workspaces/project/index.ts] *new* 
import "./app.vue";
//// [/home/src/workspaces/project/node_modules/fail/package.json] *new* 
{
    "name": "fail",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["failing-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "contentMappers": [
        { "package": "fail", "extensions": [".vue"] }
    ]
}

tsgo --runExternalCode
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mapp.vue[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS18068: [0mThe content mapper 'fail' failed to transform this file.
  The content mapper process failed while handling the transform request.

[7m1[0m 
[7m [0m [91m~[0m


Found 1 error in app.vue[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/index.js] *new* 
import "./app.vue";


