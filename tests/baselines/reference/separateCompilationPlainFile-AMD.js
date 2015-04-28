//// [separateCompilationPlainFile-AMD.ts]

declare function run(a: number): void;
run(1);


//// [separateCompilationPlainFile-AMD.js]
define(["require", "exports"], function (require, exports) {
    run(1);
});
