/// <reference path="../fourslash.ts"/>

// @lib: es5

// @Filename: a.ts
////export var test = "test String"

// @Filename: b.ts
////import test from "./a"

// @Filename: c.ts
/////// <reference path="a.ts"/>
/////// <reference path="b.ts"/>

// @Filename: d.ts
////console.log("nothing");

goTo.file("a.ts")
verify.ProjectInfo(["/home/src/tslibs/TS/Lib/lib.es5.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts", "a.ts"])
goTo.file("b.ts")
verify.ProjectInfo(["/home/src/tslibs/TS/Lib/lib.es5.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts", "a.ts", "b.ts"])
goTo.file("c.ts")
verify.ProjectInfo(["/home/src/tslibs/TS/Lib/lib.es5.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts", "a.ts", "b.ts", "c.ts"])
goTo.file("d.ts")
verify.ProjectInfo(["/home/src/tslibs/TS/Lib/lib.es5.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.d.ts", "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts", "d.ts"])

