// @declaration: true
let a: /a/l = "a"; // Should error, runtime has no `l` flag, so type cannot be matched

let b: /b/l = "b" as /b/l; // Should be fine, cast can work around inoperable flags
