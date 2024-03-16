type TestType<Keys extends string> = string extends Keys ? Record<Keys, string> : Record<Keys, string>

function inferHelper<Keys extends string>(data: TestType<Keys>) {
    return data;
}

export const a = inferHelper({
    // key1 is inferred to be value1 here
    key1: "value1"
})