/// <reference path='fourslash.ts' />

// Tests that todos are not found in node_modules folder.

// @Filename: todoTest0.ts
//// import * as foo1 from "fake-module";

// @Filename: node_modules/fake-module/ts.ts
//// // TODO

verify.todoCommentsInCurrentFile(["TODO"]);
