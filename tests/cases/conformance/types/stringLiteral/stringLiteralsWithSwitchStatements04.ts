let x: "foo";
let y: "foo" | "bar"; 

declare function randBool(): boolean;

switch (randBool() ? "foo" : "bar") {
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
