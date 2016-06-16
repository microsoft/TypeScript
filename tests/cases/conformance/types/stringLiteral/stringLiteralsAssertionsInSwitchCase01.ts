switch ("foo") {
    case "bar" as string:
        break;
    case (("bar" || "baz") as string):
        break;
}