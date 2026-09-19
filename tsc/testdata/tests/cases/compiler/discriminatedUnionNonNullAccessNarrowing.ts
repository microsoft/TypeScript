// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

// A non-null assertion narrows only the asserted expression itself; it does not establish a
// persistent non-null flow fact for the underlying reference. This must hold identically for
// unions small enough to use the fallback discriminant narrowing path and unions large enough
// to use the optimized key-property path, so that a `!` assertion behaves consistently
// regardless of union size (#62511). Optional chaining remains the idiomatic way to narrow the
// reference itself and continues to do so unchanged.

type Small =
    | { type: "1" }
    | { type: "2" }
    | undefined;

type Large =
    | { type: "1" }
    | { type: "2" }
    | { type: "3" }
    | { type: "4" }
    | { type: "5" }
    | { type: "6" }
    | { type: "7" }
    | { type: "8" }
    | { type: "9" }
    | { type: "10" }
    | undefined;

// Strict equality, both branches.

declare let smallEqual: Small;
if (smallEqual!.type === "1") {
    // @ts-expect-error
    smallEqual.type;
} else {
    // @ts-expect-error
    smallEqual.type;
}

declare let largeEqual: Large;
if (largeEqual!.type === "1") {
    // @ts-expect-error
    largeEqual.type;
} else {
    // @ts-expect-error
    largeEqual.type;
}

// Strict inequality.

declare let smallNotEqual: Small;
if (smallNotEqual!.type !== "1") {
    // @ts-expect-error
    smallNotEqual.type;
}

declare let largeNotEqual: Large;
if (largeNotEqual!.type !== "1") {
    // @ts-expect-error
    largeNotEqual.type;
}

// Switch.

declare let smallSwitch: Small;
switch (smallSwitch!.type) {
    case "1":
        // @ts-expect-error
        smallSwitch.type;
        break;
}

declare let largeSwitch: Large;
switch (largeSwitch!.type) {
    case "1":
        // @ts-expect-error
        largeSwitch.type;
        break;
}

// Control: optional chaining is unaffected and remains the idiomatic way to narrow the
// reference itself, for both union sizes.

declare let smallOptional: Small;
if (smallOptional?.type === "1") {
    smallOptional.type;
}

declare let largeOptional: Large;
if (largeOptional?.type === "1") {
    largeOptional.type;
}
