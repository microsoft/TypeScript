function t1(value: number | undefined) {
    const a = value || throw new Error("Unexpected value");
}

function t2(value: number | undefined) {
    const a = value && throw new Error("Unexpected value");
}
