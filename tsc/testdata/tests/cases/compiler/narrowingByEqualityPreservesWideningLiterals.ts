// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64766

declare const kind: string | undefined;

if (kind === "a") {
    let copy = kind;
    copy = "b";

    const obj = { kind };
    obj.kind = "b";

    const arr = [kind];
    arr.push("b");
}

declare const count: number | undefined;

if (count === 1) {
    let copy = count;
    copy = 2;
}

declare const big: bigint | null;

if (big === 1n) {
    let copy = big;
    copy = 2n;
}

declare const constKind = "a";

if (constKind === "a") {
    let copy = constKind;
    copy = "b";
}

declare const annotatedKind: "a";

if (annotatedKind === "a") {
    let copy = annotatedKind;
    copy = "b";
}

declare const lit: "a" | "b" | undefined;

if (lit === "a") {
    let copy = lit;
    copy = "b";
}

if (kind !== undefined) {
    switch (kind) {
        case "a":
            let copy = kind;
            copy = "b";
    }
}

declare const requests: Array<{ parameterPath?: string }>;
requests.flatMap((request) => {
    if (request.parameterPath === "lookupFields") return [{ parameterPath: request.parameterPath }];
    if (request.parameterPath === "recordFields") return [{ parameterPath: request.parameterPath }];
    return [];
});
