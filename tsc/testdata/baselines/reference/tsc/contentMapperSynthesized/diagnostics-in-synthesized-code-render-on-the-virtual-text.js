currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
<template>
    <Widget />
</template>
//// [/home/src/workspaces/project/index.ts] *new* 
import "./app.vue";
//// [/home/src/workspaces/project/node_modules/synth/package.json] *new* 
{
    "name": "synth",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["synthesizing-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "contentMappers": [
        { "package": "synth", "extensions": [".vue"] }
    ]
}

tsgo --runExternalCode
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mapp.vue[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2304: [0mCannot find name 'jsxRuntime'.
  This location is in virtual code produced by the content mapper 'synth@1.0.0' and has no corresponding location in the original file.

[7m1[0m export const el = jsxRuntime(Widget);
[7m [0m [91m                  ~~~~~~~~~~[0m

[96mapp.vue[0m:[93m1[0m:[93m30[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Widget'.
  This location is in virtual code produced by the content mapper 'synth@1.0.0' and has no corresponding location in the original file.

[7m1[0m export const el = jsxRuntime(Widget);
[7m [0m [91m                             ~~~~~~[0m


Found 2 errors in the same file, starting at: app.vue[90m:1[0m

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


