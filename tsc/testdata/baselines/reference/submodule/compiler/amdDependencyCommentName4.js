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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<amd-dependency path='aliasedModule5' name='n1'/>
///<amd-dependency path='unaliasedModule3'/>
///<amd-dependency path='aliasedModule6' name='n2'/>
///<amd-dependency path='unaliasedModule4'/>
require("unaliasedModule1");
const r1 = require("aliasedModule1");
r1;
const aliasedModule2_1 = require("aliasedModule2");
aliasedModule2_1.p1;
const aliasedModule3_1 = require("aliasedModule3");
aliasedModule3_1.default;
const ns = require("aliasedModule4");
ns;
require("unaliasedModule2");
