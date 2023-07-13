//// [tests/cases/compiler/deduplicateImportsInSystem.ts] ////

//// [deduplicateImportsInSystem.ts]
import {A} from "f1";
import {B} from "f2";
import {C} from "f3";
import {D} from 'f2';
import {E} from "f2";
import {F} from 'f1';

console.log(A + B + C + D + E + F)

//// [deduplicateImportsInSystem.js]
System.register(["f1", "f2", "f3"], function (exports_1, context_1) {
    "use strict";
    var f1_1, f2_1, f3_1, f2_2, f2_3, f1_2;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (f1_1_1) {
                f1_1 = f1_1_1;
                f1_2 = f1_1_1;
            },
            function (f2_1_1) {
                f2_1 = f2_1_1;
                f2_2 = f2_1_1;
                f2_3 = f2_1_1;
            },
            function (f3_1_1) {
                f3_1 = f3_1_1;
            }
        ],
        execute: function () {
            console.log(f1_1.A + f2_1.B + f3_1.C + f2_2.D + f2_3.E + f1_2.F);
        }
    };
});
