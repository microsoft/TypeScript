//// [isolatedModulesPlainFile-UMD.ts]

declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-UMD.js]
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    run(1);
});
