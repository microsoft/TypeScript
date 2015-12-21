let x: "foo";
let y: "foo" | "bar"; 

switch (x) {
    case "foo":
        break;
    case "bar":
        break;
    case y:
        y;
        break;
}
