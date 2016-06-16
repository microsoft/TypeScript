//// [stringLiteralsWithSwitchStatements06.ts]
let x: "foo";
let y: "foo" | "bar"; 

declare function randBool(): boolean;

switch (y) {
    case "foo", x:
        break;
    case x, "foo":
        break;
    case x, "baz":
        break;
    case "baz", x:
        break;
    case "baz" && "bar":
        break;
    case "bar" && "baz";
        break;
    case "baz" && ("foo" || "bar"):
        break;
    case "bar" && ("baz" || "bar"):
        break;
}


//// [stringLiteralsWithSwitchStatements06.js]
var x;
var y;
switch (y) {
    case "foo", x:
        break;
    case x, "foo":
        break;
    case x, "baz":
        break;
    case "baz", x:
        break;
    case "baz" && "bar":
        break;
    case "bar" && "baz":
        ;
        break;
    case "baz" && ("foo" || "bar"):
        break;
    case "bar" && ("baz" || "bar"):
        break;
}
