currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.vue] *new* 
<template>a</template>
//// [/home/src/workspaces/project/b.vue] *new* 
<template>b</template>
//// [/home/src/workspaces/project/c.vue] *new* 
<template>c</template>
//// [/home/src/workspaces/project/d.vue] *new* 
<template>d</template>
//// [/home/src/workspaces/project/e.vue] *new* 
<template>e</template>
//// [/home/src/workspaces/project/f.vue] *new* 
<template>f</template>
//// [/home/src/workspaces/project/index.ts] *new* 
import "./a.vue";
import "./b.vue";
import "./c.vue";
import "./d.vue";
import "./e.vue";
import "./f.vue";
//// [/home/src/workspaces/project/node_modules/missing/package.json] *new* 
{
    "name": "missing",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["missing-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "contentMappers": [
        { "package": "missing", "extensions": [".vue"] }
    ]
}

tsgo --runExternalCode --singleThreaded
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS100057: [0mThe content mapper 'missing' could not be initialized.
  The content mapper command 'missing-mapper' could not be started: contentmappertest: unknown mapper command [missing-mapper]

Found 1 error.

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
import "./a.vue";
import "./b.vue";
import "./c.vue";
import "./d.vue";
import "./e.vue";
import "./f.vue";


