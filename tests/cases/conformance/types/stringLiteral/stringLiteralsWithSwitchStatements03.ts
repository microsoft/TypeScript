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
