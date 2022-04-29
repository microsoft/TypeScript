//// [stringLiteralMatchedInSwitch01.ts]
type S = "a" | "b";
type T = S[] | S;

var foo: T;
switch (foo) {
    case "a":
    case "b":
        break;
    default:
        foo = (foo as S[])[0];
        break;
}

//// [stringLiteralMatchedInSwitch01.js]
var foo;
switch (foo) {
    case "a":
    case "b":
        break;
    default:
        foo = foo[0];
        break;
}
