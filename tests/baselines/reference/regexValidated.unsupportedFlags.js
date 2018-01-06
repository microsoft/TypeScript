//// [regexValidated.unsupportedFlags.ts]
let a: /a/l = "a"; // Should error, runtime has no `l` flag, so type cannot be matched

let b: /b/l = "b" as /b/l; // Should be fine, cast can work around inoperable flags


//// [regexValidated.unsupportedFlags.js]
var a = "a"; // Should error, runtime has no `l` flag, so type cannot be matched
var b = "b"; // Should be fine, cast can work around inoperable flags


//// [regexValidated.unsupportedFlags.d.ts]
declare let a: /a/l;
declare let b: /b/l;
