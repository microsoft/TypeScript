// @strict: true
// @noEmit: true

type U =
    | { kind: "a"; payload: number; callback: () => void }
    | { kind: "b"; payload: string; callback: () => void };

const { kind, payload, callback }: U = {
    kind: "a",
    payload: 1,
    callback: () => {
        if (kind === "a") payload.toFixed();
    },
};
