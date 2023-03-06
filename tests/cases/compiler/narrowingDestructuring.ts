type X = { kind: "a", a: string } | { kind: "b", b: string }

function func<T extends X>(value: T) {
    if (value.kind === "a") {
        value.a;
        const { a } = value;
    } else {
        value.b;
        const { b } = value;
    }
}

type Z = { kind: "f", f: { a: number, b: string, c: number } }
    | { kind: "g", g: { a: string, b: number, c: string }};

function func2<T extends Z>(value: T) {
    if (value.kind === "f") {
        const { f: f1 } = value;
        const { f: { a, ...spread } } = value;
        value.f;
    } else {
        const { g: { c, ...spread } } = value;
        value.g;
    }
}

function func3<T extends { kind: "a", a: string } | { kind: "b", b: number }>(t: T) {
    if (t.kind === "a") {
        const { kind, ...r1 } = t;
        const r2 = (({ kind, ...rest }) => rest)(t);
    }
}

function farr<T extends [number, string, string] | [string, number, number]>(x: T) {
    const [head, ...tail] = x;
    if (typeof x[0] === 'number') {
        const [head, ...tail] = x;
    }
}
