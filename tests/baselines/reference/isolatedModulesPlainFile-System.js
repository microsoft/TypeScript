//// [isolatedModulesPlainFile-System.ts]
declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-System.js]
System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            run(1);
        }
    };
});
