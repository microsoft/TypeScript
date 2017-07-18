// Tests that todos are not found in node_modules folder.

// @Filename: /node_modules/todotest0.ts
//// // TODO

verify.todoCommentsInCurrentFile(["TODO"]);
