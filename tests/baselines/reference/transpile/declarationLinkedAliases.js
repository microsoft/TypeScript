//// [declarationLinkedAliases.ts] ////
import { A } from "mod";
import B = A.C;
export { B };
//// [declarationLinkedAliases.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
var mod_1 = require("mod");
var B = mod_1.A.C;
exports.B = B;
