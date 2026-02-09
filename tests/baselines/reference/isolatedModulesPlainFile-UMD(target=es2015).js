//// [tests/cases/compiler/isolatedModulesPlainFile-UMD.ts] ////

//// [isolatedModulesPlainFile-UMD.ts]
declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-UMD.js]
"use strict";
run(1);
