//// [tests/cases/compiler/isolatedModulesPlainFile-System.ts] ////

//// [isolatedModulesPlainFile-System.ts]
declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-System.js]
run(1);
