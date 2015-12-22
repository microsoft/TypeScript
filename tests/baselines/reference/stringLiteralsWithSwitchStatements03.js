//// [stringLiteralsWithSwitchStatements03.ts]
let x: "foo";
let y: "foo" | "bar"; 

switch ("foo") {
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


//// [stringLiteralsWithSwitchStatements03.js]
var x;
var y;
switch ("foo") {
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
