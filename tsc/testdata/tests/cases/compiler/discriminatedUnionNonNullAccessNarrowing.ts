// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

// Discriminant narrowing should be consistent regardless of union size (#62511).

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

declare let small: Small;
if (small!.type === "1") {
    // @ts-expect-error
    small.type;
}

declare let large: Large;
if (large!.type === "1") {
    // @ts-expect-error
    large.type;
}
