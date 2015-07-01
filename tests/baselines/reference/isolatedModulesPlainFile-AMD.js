//// [isolatedModulesPlainFile-AMD.ts]

declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-AMD.js]
define(["require", "exports"], function (require, exports) {
    run(1);
});
