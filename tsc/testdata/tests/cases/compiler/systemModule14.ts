// @target: es2015
// @module: system
// @isolatedModules: true

function foo() {
    return a;
}

import {a} from "foo";
export {foo}

var x = 1;
export {foo as b}