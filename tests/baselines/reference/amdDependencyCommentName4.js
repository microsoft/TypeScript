//// [tests/cases/compiler/amdDependencyCommentName4.ts] ////

//// [amdDependencyCommentName4.ts]
///<amd-dependency path='aliasedModule5' name='n1'/>
///<amd-dependency path='unaliasedModule3'/>
///<amd-dependency path='aliasedModule6' name='n2'/>
///<amd-dependency path='unaliasedModule4'/>

import "unaliasedModule1";

import r1 = require("aliasedModule1");
r1;

import {p1, p2, p3} from "aliasedModule2";
p1;

import d from "aliasedModule3";
d;

import * as ns from "aliasedModule4";
ns;

import "unaliasedModule2";

//// [amdDependencyCommentName4.js]
///<amd-dependency path='aliasedModule5' name='n1'/>
///<amd-dependency path='unaliasedModule3'/>
///<amd-dependency path='aliasedModule6' name='n2'/>
///<amd-dependency path='unaliasedModule4'/>
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "aliasedModule5", "aliasedModule6", "aliasedModule1", "aliasedModule2", "aliasedModule3", "aliasedModule4", "unaliasedModule3", "unaliasedModule4", "unaliasedModule1", "unaliasedModule2"], function (require, exports, n1, n2, r1, aliasedModule2_1, aliasedModule3_1, ns) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    aliasedModule3_1 = __importDefault(aliasedModule3_1);
    ns = __importStar(ns);
    r1;
    aliasedModule2_1.p1;
    aliasedModule3_1.default;
    ns;
});
