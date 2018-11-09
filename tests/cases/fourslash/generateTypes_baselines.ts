/// <reference path="fourslash.ts" />

////dummy text

verify.generateTypes(
    // would like to test against the real "global" but that may vary between node versions.
    {
        value: {
            Array: ignore(Array, ["values", "flat", "flatMap"]),
            Boolean,
            Date,
            Math,
            Number,
            RegExp,
            String: ignore(String, ["padStart", "padEnd", "trimStart", "trimEnd"]),
            Symbol: ignore(Symbol, ["asyncIterator", "description"]),
        },
        outputBaseline: "global",
    },
    { value: require("lodash"), outputBaseline: "lodash" },
);

// Ignore properties only present in newer versions of node.
function ignore(Cls: Function, ignored: ReadonlyArray<string>): Function {
    class Copy {}
    for (const name of Object.getOwnPropertyNames(Cls)) {
        if (ignored.includes(name) || name === "arguments" || name === "caller" || name === "name" || name === "length" || name === "prototype") continue;
        Copy[name] = Cls[name];
    }
    for (const name of Object.getOwnPropertyNames(Cls.prototype)) {
        if (ignored.includes(name)) continue;
        Copy.prototype[name] = Cls.prototype[name];
    }
    return Copy;
}
