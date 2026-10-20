// @strict: true
// @noEmit: true

type Full = string | not string;

function complementEquality(value: Full) {
    if (value == 42 && typeof value === "string") {
        const text: string = value;
        // Error: "42" reaches this branch through coercion.
        const impossible: never = value;
    }
    if (42 != value) {
    } else if (typeof value === "string") {
        const text: string = value;
        // Error: Reversing the operands and negating the comparison still allows strings.
        const impossible: never = value;
    }
    if (value === 42) {
        const literal: 42 = value;
    }
    if (value !== 42) {
        const excluded: not 42 = value;
    }
}

function unknownEquality(value: unknown) {
    if (value == 42 && typeof value === "string") {
        const text: string = value;
        // Error: "42" reaches this branch through coercion.
        const impossible: never = value;
    }
    if (42 != value) {
    } else if (typeof value === "string") {
        const text: string = value;
        // Error: Reversing the operands and negating the comparison still allows strings.
        const impossible: never = value;
    }
    if (value === 42) {
        const literal: 42 = value;
    }
    if (value !== 42) {
        const excluded: not 42 = value;
    }
}

function complementPropertyEquality(value: { full: Full }) {
    if (value.full == 42 && typeof value.full === "string") {
        const text: string = value.full;
        // Error: A property can also contain the coerced string.
        const impossible: never = value.full;
    }
    if (42 != value.full) {
    } else if (typeof value.full === "string") {
        const text: string = value.full;
        // Error: The false inequality branch still allows strings.
        const impossible: never = value.full;
    }
}

complementEquality("42");
unknownEquality("42");
complementPropertyEquality({ full: "42" });