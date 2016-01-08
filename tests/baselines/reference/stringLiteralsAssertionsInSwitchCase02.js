//// [stringLiteralsAssertionsInSwitchCase02.ts]
switch ("foo" as string) {
    case "bar":
        break;
    case (("bar" || "baz")):
        break;
}

//// [stringLiteralsAssertionsInSwitchCase02.js]
switch ("foo") {
    case "bar":
        break;
    case (("bar" || "baz")):
        break;
}
