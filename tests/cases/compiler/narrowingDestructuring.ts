type X = { kind: "a", a: string } | { kind: "b", b: string }

function func<T extends X>(value: T) {
    if (value.kind === "a") {
        value.a;
        const { a } = value;
    } else {
        const { b } = value;
        value.b;
    }
}

type Z = { e: 1, f: { a: number, b: string, c: number } }
    | { e: 2, g: { a: string, b: number, c: string }};

function func2<T extends Z>(value: T) {
    if (value.e === 1) {
        const { f: { a, ...spread } } = value;
    } else {
        const { g: { c, ...spread } } = value;
    }
}
