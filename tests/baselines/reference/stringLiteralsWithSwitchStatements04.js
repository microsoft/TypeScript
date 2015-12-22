//// [stringLiteralsWithSwitchStatements04.ts]
let x: "foo";
let y: "foo" | "bar"; 

declare function randBool(): boolean;

switch (randBool() ? "foo" : "bar") {
    case "foo":
        break;
    case "bar":
        break;
    case x:
        x;
        break;
    case y:
        y;
        break;
}


//// [stringLiteralsWithSwitchStatements04.js]
var x;
var y;
switch (randBool() ? "foo" : "bar") {
    case "foo":
        break;
    case "bar":
        break;
    case x:
        x;
        break;
    case y:
        y;
        break;
}
