//// [tests/cases/conformance/types/literal/stringLiteralsWithSwitchStatements03.ts] ////

//// [stringLiteralsWithSwitchStatements03.ts]
declare let x: "foo";
declare let y: "foo" | "bar";
declare let z: "bar";

declare function randBool(): boolean;

switch (x) {
    case randBool() ? "foo" : "baz":
        break;
    case (randBool() ? ("bar") : "baz" ? "bar" : "baz"):
        break;
    case (("bar")):
        break;
    case (x, y, ("baz")):
        x;
        y;
        break;
    case (("foo" || ("bar"))):
        break;
    case (("bar" || ("baz"))):
        break;
    case z || "baz":
    case "baz" || z:
        z;
        break;
}


//// [stringLiteralsWithSwitchStatements03.js]
switch (x) {
    case randBool() ? "foo" : "baz":
        break;
    case (randBool() ? ("bar") : "baz" ? "bar" : "baz"):
        break;
    case (("bar")):
        break;
    case (x, y, ("baz")):
        x;
        y;
        break;
    case (("foo" || ("bar"))):
        break;
    case (("bar" || ("baz"))):
        break;
    case z || "baz":
    case "baz" || z:
        z;
        break;
}
