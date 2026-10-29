// @strict: true
// @noEmit: true

type Full = string | not string;
declare const numericCase: number;
declare const objectCase: { value: string };
declare function isFull(value: unknown): value is Full;
declare function assertFull(value: unknown): asserts value is Full;
declare function assertCondition(value: unknown): asserts value;

function complementFlow(value: Full, condition: boolean) {
    switch (value) {
        case numericCase:
            const numeric: number = value;
            break;
        case objectCase:
            const objectValue: object = value;
            break;
    }
    if (value) {
        const nonNull: {} = value;
    }
    if (typeof value === "string") {
        const text: string = value;
    }
    if (typeof value === "object" && value !== null && "value" in value) {
        const member: unknown = value.value;
    }
    value = 42;
    // Error: An exhaustive complement behaves like unknown after assignment.
    const assigned: number = value;
    if (condition) {
        value = "42";
    }
    // Error: Joining assignments must retain unknown.
    const joined: string | number = value;
    while (condition) {
        value = condition ? "42" : 42;
        condition = false;
    }
    // Error: The loop result must also retain unknown.
    const looped: string | number = value;
}

function unknownFlow(value: unknown, condition: boolean) {
    switch (value) {
        case numericCase:
            const numeric: number = value;
            break;
        case objectCase:
            const objectValue: object = value;
            break;
    }
    if (value) {
        const nonNull: {} = value;
    }
    if (typeof value === "string") {
        const text: string = value;
    }
    if (typeof value === "object" && value !== null && "value" in value) {
        const member: unknown = value.value;
    }
    value = 42;
    // Error: Unknown is not assignment-narrowed.
    const assigned: number = value;
    if (condition) {
        value = "42";
    }
    // Error: Joining assignments must retain unknown.
    const joined: string | number = value;
    while (condition) {
        value = condition ? "42" : 42;
        condition = false;
    }
    // Error: The loop result must also retain unknown.
    const looped: string | number = value;
}

function predicateFlow(value: unknown) {
    if (isFull(value)) {
        switch (value) {
            case objectCase:
                const objectValue: object = value;
                break;
        }
    }
}

function assertionFlow(value: unknown) {
    assertFull(value);
    switch (value) {
        case objectCase:
            const objectValue: object = value;
            break;
    }
    assertCondition(value == 42);
    if (typeof value === "string") {
        // Error: Assertion narrowing must preserve the reachable string branch.
        const impossible: never = value;
    }
}

function compoundAssertionFlow(value: unknown) {
    assertCondition(isFull(value) && value == 42 && typeof value === "string");
    const text: string = value;
    // Error: Narrowing steps within one assertion must also preserve strings.
    const impossible: never = value;
}

function evolvingArray(condition: boolean) {
    const values = [];
    if (condition) {
        values.push(42);
    } else {
        values.push("42");
    }
    const result: (string | number)[] = values;
    return result;
}