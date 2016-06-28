// @module: system
// @isolatedModules: true

import * as x from "foo";
import * as y from "bar";
export * from "foo";
export * from "bar"
export {x}
export {y}
import {a1, b1, c1 as d1} from "foo";
export {a2, b2, c2 as d2} from "bar";

x,y,a1,b1,d1;
