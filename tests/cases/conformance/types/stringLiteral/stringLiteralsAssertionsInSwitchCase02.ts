switch ("foo" as string) {
    case "bar":
        break;
    case (("bar" || "baz")):
        break;
}