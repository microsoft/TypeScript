
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