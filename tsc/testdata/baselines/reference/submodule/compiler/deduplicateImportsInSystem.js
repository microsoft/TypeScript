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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const f1_1 = require("f1");
const f2_1 = require("f2");
const f3_1 = require("f3");
const f2_2 = require("f2");
const f2_3 = require("f2");
const f1_2 = require("f1");
console.log(f1_1.A + f2_1.B + f3_1.C + f2_2.D + f2_3.E + f1_2.F);
