//// [stringLiteralsAssertionsInSwitchCase03.ts]
switch ("foo") {
    case "bar" as "baz":
        break;
    case (("bar" || "baz") as "foo"):
        break;
}

//// [stringLiteralsAssertionsInSwitchCase03.js]
switch ("foo") {
    case "bar":
        break;
    case ("bar" || "baz"):
        break;
}
