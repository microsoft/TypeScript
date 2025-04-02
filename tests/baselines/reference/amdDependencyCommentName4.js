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
define(["require", "exports", "aliasedModule5", "aliasedModule6", "aliasedModule1", "aliasedModule2", "aliasedModule3", "aliasedModule4", "unaliasedModule3", "unaliasedModule4", "unaliasedModule1", "unaliasedModule2"], function (require, exports, n1, n2, r1, aliasedModule2_1, aliasedModule3_1, ns) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    r1;
    aliasedModule2_1.p1;
    aliasedModule3_1.default;
    ns;
});
