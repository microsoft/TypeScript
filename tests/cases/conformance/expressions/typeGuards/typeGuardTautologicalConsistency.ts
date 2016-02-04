let stringOrNumber: string | number;

if (typeof stringOrNumber === "number") {
    if (typeof stringOrNumber !== "number") {
        stringOrNumber;
    }
}

if (typeof stringOrNumber === "number" && typeof stringOrNumber !== "number") {
    stringOrNumber;
}
