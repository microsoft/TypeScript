switch ("foo") {
    case "bar" as "baz":
        break;
    case (("bar" || "baz") as "foo"):
        break;
}