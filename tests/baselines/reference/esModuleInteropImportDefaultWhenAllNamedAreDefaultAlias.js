//// [esModuleInteropImportDefaultWhenAllNamedAreDefaultAlias.ts]
import {default as a, default as b} from "m";
void a;
void b;

//// [esModuleInteropImportDefaultWhenAllNamedAreDefaultAlias.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var m_1 = __importDefault(require("m"));
void m_1["default"];
void m_1["default"];
