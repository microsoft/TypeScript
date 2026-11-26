// @strict: true
// @noEmit: true

// Discriminant narrowing should be consistent regardless of union size (#62511).
// Large has enough constituents to be narrowed through a constituent map; Small does not.

type Small =
    | { type: "1" }
    | { type: "2" };

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
    | { type: "10" };

declare const small: Small | undefined;
declare const large: Large | undefined;

if (small!.type === "1") {
    small.type;
}
if (large!.type === "1") {
    large.type;
}

declare const smallNullOrVoid: Small | null | void;
declare const largeNullOrVoid: Large | null | void;

if (smallNullOrVoid!.type === "1" && smallNullOrVoid !== null) {
    smallNullOrVoid.type;
}
if (largeNullOrVoid!.type === "1" && largeNullOrVoid !== null) {
    largeNullOrVoid.type;
}

declare const smallWithUndefinedTag: Small | { type: undefined } | undefined;
declare const largeWithUndefinedTag: Large | { type: undefined } | undefined;

if (smallWithUndefinedTag?.type === undefined) {
    smallWithUndefinedTag.type;
}
if (largeWithUndefinedTag?.type === undefined) {
    largeWithUndefinedTag.type;
}

if (small?.type === "1") {
    small.type;
}
if (large?.type === "1") {
    large.type;
}

const smallTag = small?.type;
if (smallTag === "1") {
    small.type;
}
const largeTag = large?.type;
if (largeTag === "1") {
    large.type;
}
