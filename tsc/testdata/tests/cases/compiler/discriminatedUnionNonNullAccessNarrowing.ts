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

declare let smallEqualRight: Small;
if ("1" === smallEqualRight!.type) {
    smallEqualRight.type;
}

declare const one: "1";
declare let smallEqualIdentifier: Small;
if (smallEqualIdentifier!.type === one) {
    smallEqualIdentifier.type;
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

declare let smallSwitch: Small;
switch (smallSwitch!.type) {
    case "1":
        smallSwitch.type;
        break;
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

declare let largeSwitch: Large;
switch (largeSwitch!.type) {
    case "1":
        largeSwitch.type;
        break;
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

declare let optionalBangLeft: Small;
if (optionalBangLeft!?.type === "1") {
    optionalBangLeft.type;
} else {
    // @ts-expect-error
    optionalBangLeft.type;
}

declare let optionalBangRight: Small;
if ("1" === optionalBangRight!?.type) {
    optionalBangRight.type;
} else {
    // @ts-expect-error
    optionalBangRight.type;
}

declare let optionalBangSwitch: Small;
switch (optionalBangSwitch!?.type) {
    case "1":
        optionalBangSwitch.type;
        break;
    default:
        // @ts-expect-error
        optionalBangSwitch.type;
        break;
}

// A non-null assertion captured by an alias does not apply after the source is reassigned.

declare let aliasedValue: Small;
declare let maybeUndefined: Small;
const aliasedTag = aliasedValue!.type;

aliasedValue = maybeUndefined;

if (aliasedTag === "1") {
    // @ts-expect-error
    aliasedValue.type;
}

declare let largeAliasedValue: Large;
declare let maybeLargeUndefined: Large;
const largeAliasedTag = largeAliasedValue!.type;

largeAliasedValue = maybeLargeUndefined;

if (largeAliasedTag === "1") {
    // @ts-expect-error
    largeAliasedValue.type;
}

// Later-evaluated expressions with possible side effects do not carry the non-null fact.

declare let assignmentInRight: Small;
if (assignmentInRight!.type === (assignmentInRight = maybeUndefined, "1")) {
    // @ts-expect-error
    assignmentInRight.type;
}

declare let assignmentWrappedAccessLeft: Small;
if ((assignmentWrappedAccessLeft!.type = (assignmentWrappedAccessLeft = maybeUndefined, "1")) === "1") {
    // @ts-expect-error
    assignmentWrappedAccessLeft.type;
}

declare let assignmentWrappedAccessRight: Small;
if ("1" === (assignmentWrappedAccessRight!.type = (assignmentWrappedAccessRight = maybeUndefined, "1"))) {
    // @ts-expect-error
    assignmentWrappedAccessRight.type;
}

declare let looseEquality: Small;
const coercibleValue: any = {
    valueOf() {
        looseEquality = maybeUndefined;
        return "1";
    },
};
if (looseEquality!.type == coercibleValue) {
    // @ts-expect-error
    looseEquality.type;
}

declare let invocationInRight: Small;
if (invocationInRight!.type === (() => {
    invocationInRight = maybeUndefined;
    return "1" as const;
})()) {
    // @ts-expect-error
    invocationInRight.type;
}

declare let assignmentInCase: Small;
switch (assignmentInCase!.type) {
    case (assignmentInCase = maybeUndefined, "1"):
        // @ts-expect-error
        assignmentInCase.type;
        break;
}
