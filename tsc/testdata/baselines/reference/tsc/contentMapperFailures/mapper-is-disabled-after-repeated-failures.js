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
//// [/home/src/workspaces/project/g.vue] *new* 
<template>g</template>
//// [/home/src/workspaces/project/index.ts] *new* 
import "./a.vue";
import "./b.vue";
import "./c.vue";
import "./d.vue";
import "./e.vue";
import "./f.vue";
import "./g.vue";
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

tsgo --runExternalCode --singleThreaded
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS100026: [0mThe content mapper 'fail' failed 5 times and will not be used.
[96mc.vue[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS100025: [0mThe content mapper 'fail' failed to transform this file.
  The content mapper process failed while handling the transform request.

[7m1[0m 
[7m [0m [91m~[0m

[96md.vue[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS100025: [0mThe content mapper 'fail' failed to transform this file.
  The content mapper process failed while handling the transform request.

[7m1[0m 
[7m [0m [91m~[0m

[96me.vue[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS100025: [0mThe content mapper 'fail' failed to transform this file.
  The content mapper process failed while handling the transform request.

[7m1[0m 
[7m [0m [91m~[0m

[96mf.vue[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS100025: [0mThe content mapper 'fail' failed to transform this file.
  The content mapper process failed while handling the transform request.

[7m1[0m 
[7m [0m [91m~[0m

[96mg.vue[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS100025: [0mThe content mapper 'fail' failed to transform this file.
  The content mapper process failed while handling the transform request.

[7m1[0m 
[7m [0m [91m~[0m


Found 6 errors in 5 files.

Errors  Files
     1  c.vue[90m:1[0m
     1  d.vue[90m:1[0m
     1  e.vue[90m:1[0m
     1  f.vue[90m:1[0m
     1  g.vue[90m:1[0m

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
import "./g.vue";


