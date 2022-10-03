//// [tests/cases/compiler/pathMappingBasedModuleResolution_rootImport_aliasWithRoot_differentRootTypes.ts] ////

//// [foo.ts]
export function foo() {}

//// [bar.js]
export function bar() {}

//// [a.ts]
import { foo as foo1 } from "/foo";
import { bar as bar1 } from "/bar";
import { foo as foo2 } from "c:/foo";
import { bar as bar2 } from "c:/bar";
import { foo as foo3 } from "c:\\foo";
import { bar as bar3 } from "c:\\bar";
import { foo as foo4 } from "//server/foo";
import { bar as bar4 } from "//server/bar";
import { foo as foo5 } from "\\\\server\\foo";
import { bar as bar5 } from "\\\\server\\bar";
import { foo as foo6 } from "file:///foo";
import { bar as bar6 } from "file:///bar";
import { foo as foo7 } from "file://c:/foo";
import { bar as bar7 } from "file://c:/bar";
import { foo as foo8 } from "file://server/foo";
import { bar as bar8 } from "file://server/bar";
import { foo as foo9 } from "http://server/foo";
import { bar as bar9 } from "http://server/bar";


//// [foo.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() { }
exports.foo = foo;
//// [bar.js]
"use strict";
exports.__esModule = true;
exports.bar = void 0;
function bar() { }
exports.bar = bar;
//// [a.js]
"use strict";
exports.__esModule = true;
