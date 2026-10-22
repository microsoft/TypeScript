// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

type U =
    | { kind: "a"; payload: number; extra?: unknown }
    | { kind: "b"; payload: string; extra?: unknown };

declare const u: U;

const {
    kind,
    payload,
    extra = kind === "a" ? payload.toFixed() : payload.toUpperCase(),
} = u;

function f({
    kind,
    payload,
    extra = kind === "a" ? payload.toFixed() : payload.toUpperCase(),
}: U) {}
