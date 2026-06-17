// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/50139
// A default on a *required* discriminant must not disable discriminant narrowing of siblings.

type Props =
    | { isText: true, children: string }
    | { isText: false, children: number };

// Baseline: no default — narrows (already worked).
function noDefault({ isText, children }: Props) {
    if (isText === true) {
        const s: string = children;
    } else {
        const n: number = children;
    }
}

// The bug: default on a required discriminant should still narrow siblings.
function withDefault({ isText = false, children }: Props) {
    if (isText === true) {
        const s: string = children;
    } else {
        const n: number = children;
    }
}

// switch form.
function withDefaultSwitch({ isText = false, children }: Props) {
    switch (isText) {
        case true: { const s: string = children; break; }
        case false: { const n: number = children; break; }
    }
}

// Renamed binding `{ isText: t = false }`.
function renamed({ isText: t = false, children }: Props) {
    if (t === true) {
        const s: string = children;
    } else {
        const n: number = children;
    }
}

// Three-way union with a string discriminant.
type Three =
    | { t: "i", v: number }
    | { t: "s", v: string }
    | { t: "b", v: boolean };

function threeWay({ t = "i", v }: Three) {
    if (t === "s") {
        const s: string = v;
    }
}

// const destructuring (not a parameter).
declare const props: Props;
function constDestructure() {
    const { isText = false, children } = props;
    if (isText === true) {
        const s: string = children;
    }
}

// --- Soundness boundary: these must still error ---

// Optional discriminant + default: calling with the property omitted yields the default,
// so the sibling cannot be safely narrowed.
type OptDisc =
    | { kind?: "a", x: string }
    | { kind?: "b", x: number };

function optionalDiscriminant({ kind = "a", x }: OptDisc) {
    if (kind === "a") {
        const s: string = x; // error
    }
}

// Discriminant whose type already includes undefined.
type UndefDisc =
    | { kind: "a" | undefined, x: string }
    | { kind: "b", x: number };

function undefinedDiscriminant({ kind = "a", x }: UndefDisc) {
    if (kind === "a") {
        const s: string = x; // error
    }
}

// Sibling has its OWN default: it must not be narrowed from the parent.
type PropsOpt =
    | { isText: true, children?: string }
    | { isText: false, children?: number };

function siblingDefault({ isText = false, children = 0 }: PropsOpt) {
    if (isText === true) {
        const s: string = children; // error
    }
}
