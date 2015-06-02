/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
//// import test from "b"

// @Filename: b.ts
//// export var test = "test String"

goTo.file("a.ts")
verify.ProjectInfo(["lib.d.ts", "b.ts", "a.ts"])
