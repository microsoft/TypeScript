// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

type WeakTypes =
    | { optional?: true; }
    | { toLowerCase?(): string }
    | { toUpperCase?(): string, otherOptionalProp?: number };

type LiteralsOrWeakTypes =
    | "A"
    | "B"
    | WeakTypes;

declare let aOrB: "A" | "B";

const f = (arg: LiteralsOrWeakTypes) => {
    if (arg === "A") {
        return arg;
    }
    else {
        return arg;
    }
}

const g = (arg: WeakTypes) => {
    if (arg === "A") {
        return arg;
    }
    else {
        return arg;
    }
}

const h = (arg: LiteralsOrWeakTypes) => {
    if (arg === aOrB) {
        return arg;
    }
    else {
        return arg;
    }
}

const i = (arg: WeakTypes) => {
    if (arg === aOrB) {
        return arg;
    }
    else {
        return arg;
    }
}
