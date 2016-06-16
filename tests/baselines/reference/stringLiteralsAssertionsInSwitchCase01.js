//// [stringLiteralsAssertionsInSwitchCase01.ts]
switch ("foo") {
    case "bar" as string:
        break;
    case (("bar" || "baz") as string):
        break;
}

//// [stringLiteralsAssertionsInSwitchCase01.js]
switch ("foo") {
    case "bar":
        break;
    case ("bar" || "baz"):
        break;
}
