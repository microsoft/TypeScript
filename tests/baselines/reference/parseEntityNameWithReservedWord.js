//// [parseEntityNameWithReservedWord.ts]
enum Bool { false }
const x: Bool.false = Bool.false;


//// [parseEntityNameWithReservedWord.js]
var Bool = Bool || (Bool = {});
(function (Bool) {
    Bool[Bool["false"] = 0] = "false";
})(Bool);
var x = Bool["false"];
