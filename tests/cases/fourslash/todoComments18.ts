// Tests node_modules name in file still gets todos.

// @Filename: /node_modules_todotest0.ts
//// // [|TODO|]

verify.todoCommentsInCurrentFile(["TODO"]);