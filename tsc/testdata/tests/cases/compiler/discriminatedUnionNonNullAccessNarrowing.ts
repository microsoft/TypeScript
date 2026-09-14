// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

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

// Small union: fallback discriminant narrowing path.

declare let smallEqual: Small;
if (smallEqual!.type === "1") {
    smallEqual.type;
}

declare let smallElse: Small;
if (smallElse!.type === "1") {
} else {
    smallElse.type;
}

declare let smallNotEqual: Small;
if (smallNotEqual!.type !== "1") {
    smallNotEqual.type;
}

// Large union: optimized discriminant narrowing path.

declare let largeEqual: Large;
if (largeEqual!.type === "1") {
    largeEqual.type;
}

declare let largeElse: Large;
if (largeElse!.type === "1") {
} else {
    largeElse.type;
}

declare let largeNotEqual: Large;
if (largeNotEqual!.type !== "1") {
    largeNotEqual.type;
}

// Control cases: optional chaining already propagates non-nullability
// into the matching branch.

declare let smallOptional: Small;
if (smallOptional?.type === "1") {
    smallOptional.type;
}

declare let largeOptional: Large;
if (largeOptional?.type === "1") {
    largeOptional.type;
}
