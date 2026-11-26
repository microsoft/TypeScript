// @strict: true
// @noEmit: true

function compoundFlow(value: number | string) {
    if (typeof value === "number" && value !== 0) {
        value -= 1;
        value;
        if (value === 0) {
            value;
        }
    }
}

function compoundLikeFlow(value: number | string) {
    if (typeof value === "number" && value !== 0) {
        value = value - 1;
        value;
        if (value === 0) {
            value;
        }
    }
}

function constrainedCompoundLikeFlow(value: number & not 0) {
    value = value - 1;
    value;
}

function parenthesizedCompound(value: number | undefined) {
    if (value !== undefined && value !== 0) {
        (value) -= 1;
        value! *= 2;
    }
}

function stringCompound(value: string, holder: { value: string }) {
    if (value !== "") {
        value += "suffix";
    }
    if (holder.value !== "") {
        holder.value += "suffix";
        holder["value"] += "suffix";
    }
}

function accessorCompound(holder: { get value(): number & not 0; set value(value: number) }) {
    holder.value -= 1;
}

function constrainedCompound(holder: { value: number & not 0 }, value: number & not 0) {
    holder.value -= 1;
    holder["value"] -= 1;
    (value) -= 1;
}

function logicalAssignments(value: number | undefined) {
    if (value !== 0) {
        value ??= 0;
        value ||= 1;
        value &&= 0;
    }
}

function constrainedLogicalAssignment(value: number & not 0) {
    value &&= 0;
}