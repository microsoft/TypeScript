/// <reference path="../fourslash.ts"/>

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
verify.ProjectInfo(["/lib.d.ts", "/lib.decorators.d.ts", "/lib.decorators.legacy.d.ts", "a.ts"])
goTo.file("b.ts")
verify.ProjectInfo(["/lib.d.ts", "/lib.decorators.d.ts", "/lib.decorators.legacy.d.ts", "a.ts", "b.ts"])
goTo.file("c.ts")
verify.ProjectInfo(["/lib.d.ts", "/lib.decorators.d.ts", "/lib.decorators.legacy.d.ts", "a.ts", "b.ts", "c.ts"])
goTo.file("d.ts")
verify.ProjectInfo(["/lib.d.ts", "/lib.decorators.d.ts", "/lib.decorators.legacy.d.ts", "d.ts"])

