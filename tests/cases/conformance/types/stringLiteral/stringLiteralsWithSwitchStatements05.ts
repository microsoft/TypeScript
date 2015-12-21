let x: "foo";
let y: "foo" | "bar"; 

declare function randBool(): boolean;

switch (x) {
    case randBool() ? "foo" : "baz":
        break;
    case (("bar")):
        break;
    case (x, y, "baz"):
        x;
        break;
    case (("foo" || "bar")):
        y;
        break;
}
