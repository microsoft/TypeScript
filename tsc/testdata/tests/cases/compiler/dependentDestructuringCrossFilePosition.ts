// @strict: true
// @noEmit: true

// @filename: types.d.ts
type U =
    | { kind: "a"; payload: number }
    | { kind: "b"; payload: string };

declare function make(): U;

// @filename: a.ts
const { kind, payload }: U = make();

// @filename: b.ts
if (kind === "a") payload.toFixed();
