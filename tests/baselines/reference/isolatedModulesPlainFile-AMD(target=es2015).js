//// [tests/cases/compiler/isolatedModulesPlainFile-AMD.ts] ////

//// [isolatedModulesPlainFile-AMD.ts]
declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-AMD.js]
"use strict";
run(1);
