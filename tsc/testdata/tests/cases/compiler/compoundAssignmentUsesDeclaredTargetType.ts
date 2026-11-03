// @strict: true
// @target: esnext

function numeric(value: number | string) {
    if (typeof value === "number" && value !== 0) {
        const result: number = value -= 1;
    }
}

function concatenate(value: number | string) {
    if (typeof value === "number" && value !== 0) {
        const result: string = value += "suffix";
    }
}

function text(value: string) {
    if (value !== "") {
        const result: string = value += "suffix";
    }
}

function bigint(value: bigint) {
    if (value !== 0n) {
        const result: bigint = value *= 2n;
    }
}

function wrapped(value: number | undefined) {
    if (value !== undefined && value !== 0) {
        (value) -= 1;
        value! *= 2;
        ((value)!) += 1;
    }
}

function satisfies(value: number) {
    if (value !== 0) {
        (value satisfies number) -= 1;
    }
}

function properties(holder: { value: number | string }, key: "value") {
    if (typeof holder.value === "number" && holder.value !== 0) {
        holder.value -= 1;
    }
    if (typeof holder["value"] === "number" && holder["value"] !== 0) {
        holder["value"] -= 1;
    }
    if (typeof holder[key] === "number" && holder[key] !== 0) {
        holder[key] -= 1;
    }
}

function accessors(holder: { get value(): number; set value(value: number | string) }) {
    holder.value -= 1;
    holder["value"] -= 1;
    (holder.value) -= 1;
    (holder["value"]) -= 1;
    holder.value += "suffix";
    holder["value"] += "suffix";
}

function constrained(value: number & not 0, holder: { value: number & not 0 }) {
    value -= 1;
    (value) -= 1;
    holder.value -= 1;
    holder["value"] -= 1;
    (holder.value) -= 1;
    (holder["value"]) -= 1;
}

function constrainedSetter(holder: { get value(): number; set value(value: number & not 0) }) {
    holder.value -= 1;
    holder["value"] -= 1;
    (holder.value) -= 1;
    (holder["value"]) -= 1;
}

function generic<T extends number>(value: T) {
    if (value !== 0) {
        value -= 1;
    }
}

function unionKey(holder: { a: number & not 0; b: number }, key: "a" | "b") {
    holder[key] -= 1;
}

function asserted(value: number) {
    (value as number & not 0) -= 1;
}

function invalidOperands(value: number | string) {
    if (typeof value === "string" && value !== "") {
        value -= 1;
    }
}

function readonlyTargets(holder: { readonly value: number }) {
    const value = 1;
    value -= 1;
    holder.value -= 1;
    holder["value"] -= 1;
}
