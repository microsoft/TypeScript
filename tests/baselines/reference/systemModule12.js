//// [tests/cases/compiler/systemModule12.ts] ////

//// [systemModule12.ts]
///<amd-module name='NamedModule'/>
import n from 'file1'


//// [systemModule12.js]
System.register("NamedModule", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
