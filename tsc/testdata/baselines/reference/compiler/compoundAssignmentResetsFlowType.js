//// [tests/cases/compiler/compoundAssignmentResetsFlowType.ts] ////

//// [compoundAssignmentResetsFlowType.ts]
export function numeric(value: number) {
    if (value !== 0) {
        value -= 1;
        value;
        if (value === 0) {
            const zero: 0 = value;
        }
    }
    return value;
}

export function updates(value: number) {
    if (value !== 0) {
        value++;
        value;
    }
    if (value !== 0) {
        --value;
        value;
    }
    if (value !== 0) {
        ++value;
        value;
    }
    if (value !== 0) {
        value--;
        value;
    }
    return value;
}

export function changeKind(value: number | string) {
    if (typeof value === "number") {
        value += "suffix";
        return value;
    }
    throw new Error();
}

export function properties(holder: { value: number }) {
    if (holder.value !== 0) {
        holder.value -= 1;
        holder.value;
    }
    if (holder["value"] !== 0) {
        holder["value"]--;
        holder["value"];
    }
    return holder.value;
}

export function loop(value: number) {
    while (value !== 0) {
        value -= 1;
    }
    const zero: 0 = value;
    return value;
}

export function inferredNumber() {
    let value;
    value = 2;
    if (value !== 0) {
        value -= 1;
        value;
    }
    return value;
}

export function inferredString() {
    let value;
    value = "text";
    value += [];
    value += 1;
    return value;
}

export function inferredBigInt() {
    let value;
    value = 1n;
    value++;
    return value;
}

export function inferredLoop() {
    let value;
    value = 2;
    while (value !== 0) {
        value -= 1;
    }
    return value;
}

export function defaultOr(value: 0 | 1 | undefined) {
    value ||= 1;
    const result: 1 = value;
    return value;
}

export function defaultNullish(value: 0 | 1 | undefined) {
    value ??= 1;
    const result: 0 | 1 = value;
    return value;
}

export function conditionalAnd(value: 0 | 1 | undefined) {
    value &&= 0;
    const result: 0 | undefined = value;
    return value;
}

export function declaredConstraint(value: number & not 0) {
    value -= 1;
    const retained: number & not 0 = value;
    return value;
}


//// [compoundAssignmentResetsFlowType.js]
export function numeric(value) {
    if (value !== 0) {
        value -= 1;
        value;
        if (value === 0) {
            const zero = value;
        }
    }
    return value;
}
export function updates(value) {
    if (value !== 0) {
        value++;
        value;
    }
    if (value !== 0) {
        --value;
        value;
    }
    if (value !== 0) {
        ++value;
        value;
    }
    if (value !== 0) {
        value--;
        value;
    }
    return value;
}
export function changeKind(value) {
    if (typeof value === "number") {
        value += "suffix";
        return value;
    }
    throw new Error();
}
export function properties(holder) {
    if (holder.value !== 0) {
        holder.value -= 1;
        holder.value;
    }
    if (holder["value"] !== 0) {
        holder["value"]--;
        holder["value"];
    }
    return holder.value;
}
export function loop(value) {
    while (value !== 0) {
        value -= 1;
    }
    const zero = value;
    return value;
}
export function inferredNumber() {
    let value;
    value = 2;
    if (value !== 0) {
        value -= 1;
        value;
    }
    return value;
}
export function inferredString() {
    let value;
    value = "text";
    value += [];
    value += 1;
    return value;
}
export function inferredBigInt() {
    let value;
    value = 1n;
    value++;
    return value;
}
export function inferredLoop() {
    let value;
    value = 2;
    while (value !== 0) {
        value -= 1;
    }
    return value;
}
export function defaultOr(value) {
    value ||= 1;
    const result = value;
    return value;
}
export function defaultNullish(value) {
    value ??= 1;
    const result = value;
    return value;
}
export function conditionalAnd(value) {
    value &&= 0;
    const result = value;
    return value;
}
export function declaredConstraint(value) {
    value -= 1;
    const retained = value;
    return value;
}


//// [compoundAssignmentResetsFlowType.d.ts]
export declare function numeric(value: number): number;
export declare function updates(value: number): number;
export declare function changeKind(value: number | string): string | number;
export declare function properties(holder: {
    value: number;
}): number;
export declare function loop(value: number): number;
export declare function inferredNumber(): number;
export declare function inferredString(): string;
export declare function inferredBigInt(): bigint;
export declare function inferredLoop(): number;
export declare function defaultOr(value: 0 | 1 | undefined): 1;
export declare function defaultNullish(value: 0 | 1 | undefined): 0 | 1;
export declare function conditionalAnd(value: 0 | 1 | undefined): 0 | undefined;
export declare function declaredConstraint(value: number & not 0): number & not 0;
