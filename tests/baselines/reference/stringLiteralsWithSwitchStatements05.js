//// [stringLiteralsWithSwitchStatements05.ts]
let x: "foo";
let y: "foo" | "bar"; 

declare function randBool(): boolean;

switch (x) {
    case randBool() ? "foo" : "baz":
        break;
    case (("bar")):
        break;
    case (x, y, "baz"):
        x;
        break;
    case (("foo" || "bar")):
        y;
        break;
}


//// [stringLiteralsWithSwitchStatements05.js]
var x;
var y;
switch (x) {
    case randBool() ? "foo" : "baz":
        break;
    case (("bar")):
        break;
    case (x, y, "baz"):
        x;
        break;
    case (("foo" || "bar")):
        y;
        break;
}
