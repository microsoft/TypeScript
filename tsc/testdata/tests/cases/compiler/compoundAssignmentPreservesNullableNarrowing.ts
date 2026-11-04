// @strict: true
// @target: esnext
// @declaration: true

enum Flags {
    None = 0,
    First = 1,
    Second = 2,
}

export function enumFlags(value: Flags | undefined) {
    if (value === undefined) {
        value = Flags.None;
        value |= Flags.First;
        value |= Flags.Second;
    }
    const result: Flags = value;
    return value;
}

export function numeric(value: number | null | undefined) {
    if (value != null) {
        value -= 1;
        value += 1;
        value *= 2;
        value /= 2;
        value %= 2;
        value **= 2;
        value <<= 1;
        value >>= 1;
        value >>>= 1;
        value |= 1;
        value &= 1;
        value ^= 1;
        const result: number = value;
        return value;
    }
    throw new Error();
}

export function updates(value: number | null | undefined) {
    if (value != null) {
        value++;
        ++value;
        value--;
        --value;
        const result: number = value;
        return value;
    }
    throw new Error();
}

export function bigint(value: bigint | null | undefined) {
    if (value != null) {
        value *= 2n;
        value++;
        const result: bigint = value;
        return value;
    }
    throw new Error();
}

export function text(value: string | null | undefined) {
    if (value != null) {
        value += "suffix";
        const result: string = value;
        return value;
    }
    throw new Error();
}

export function properties(holder: { value?: number | null }) {
    if (holder.value != null) {
        holder.value -= 1;
        holder["value"]++;
        const result: number = holder.value;
        return holder["value"];
    }
    throw new Error();
}

export function loop(value: number | null | undefined) {
    if (value != null) {
        while (value !== 0) {
            value -= 1;
        }
        const result: 0 = value;
        return value;
    }
    throw new Error();
}

export function mutableFlags(value: number, flags: number[]) {
    if (value === 0) return "";
    let remainingFlags: number = value;
    for (const flag of flags) {
        remainingFlags &= ~flag;
    }
    return remainingFlags === 0 ? "all" : "some";
}

export function unchecked(value: number | null | undefined) {
    value -= 1;
    value++;
    const result: number = value;
    return value;
}

export function checkedOnlyNull(value: number | null | undefined) {
    if (value !== null) {
        value -= 1;
        const result: number | undefined = value;
        const invalid: number = value;
        return value;
    }
    throw new Error();
}

export function checkedOnlyUndefined(value: number | null | undefined) {
    if (value !== undefined) {
        value -= 1;
        const result: number | null = value;
        const invalid: number = value;
        return value;
    }
    throw new Error();
}
