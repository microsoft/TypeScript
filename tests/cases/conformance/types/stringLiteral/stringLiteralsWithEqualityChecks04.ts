interface Runnable {
    isRunning: boolean;
}

interface Refrigerator extends Runnable {
    makesFoodGoBrrr: boolean;
}

let x: string;
let y: "foo" | Refrigerator;

let b: boolean;
b = x == y;
b = "foo" == y
b = y == "foo";
b = "foo" == "bar";
b = "bar" == x;
b = x == "bar";
b = y == "bar";
b = "bar" == y;

b = x != y;
b = "foo" != y
b = y != "foo";
b = "foo" != "bar";
b = "bar" != x;
b = x != "bar";
b = y != "bar";
b = "bar" != y;
