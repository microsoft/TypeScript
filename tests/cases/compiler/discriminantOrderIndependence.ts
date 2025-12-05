interface A {
    subType: "b";
    type: "a";
}

declare let order1:
    | { type: "1" }
    | A
    | { type: "2" }
    | { type: "3" }
    | undefined;

// Should NOT error: 'order1' is possibly 'undefined' after the guard
if (order1 && order1.type === "a") {
    order1.type; // Should be OK
}

interface B {
    subType: "b";
    type: "a";
}

declare let order2:
    | { type: "1" }
    | { type: "2" }
    | { type: "3" }
    | B
    | undefined;

// Should NOT error: 'order2' is possibly 'undefined' after the guard
if (order2 && order2.type === "a") {
    order2.type; // Should be OK
}

// Also test with !. type assertion
if (order1 && order1.type === "a") {
    order1.type; // Should be OK
}
if (order2 && order2.type === "a") {
    order2.type; // Should be OK
}