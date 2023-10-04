export function foo(a: number): string | 42 {
    if (a === 3) {
        return 42;
    }
    return String(a);
}

function foo2(a: number) {
    if (a === 3) {
        return 42;
    }
    return String(a);
}

export function singleReturn(): number {
    return 42;
}

function singleReturn2() {
    return 42;
}

export function singleReturnNonLiteral(): string | 42 {
    return foo(2);
}

function singleReturnNonLiteral2() {
    return foo(2);
}

export function multipleReturn(a: number): 42 | 43 {
    if (a === 0) {
        return 42;
    }
    return 43;
}

function multipleReturn2(a: number) {
    if (a === 0) {
        return 42;
    }
    return 43;
}

function makeResource(identifier: string): string {
    return identifier;
}
export function returnObjectLiteral(): {
    Label: string;
    Button: string;
} {
    return {
        Label: makeResource("Label"),
        Button: makeResource("Label")
    };
}
export function returnObjectLiteral2(): {
    Label: number;
    Button: string;
} {
    return {
        Label: 42,
        Button: "42"
    };
}
