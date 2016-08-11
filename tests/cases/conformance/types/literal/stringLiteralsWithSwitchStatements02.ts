let x: "foo";
let y: "foo" | "bar";

let b: boolean;
b = x == y;
b = "foo" == y
b = y == "foo";
b = "foo" == "bar";

b = x != y;
b = "foo" != y
b = y != "foo";
b = "foo" != "bar";

