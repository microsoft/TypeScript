/// <reference path='fourslash.ts' />

// Tests node_modules name in file still gets todos.

// @Filename: /node_modules_todoTest0.ts
//// // [|TODO|]

verify.todoCommentsInCurrentFile(["TODO"]);