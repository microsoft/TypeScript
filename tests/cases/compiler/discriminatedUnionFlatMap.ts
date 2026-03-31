// @strict: true
// @noEmit: true
// @lib: es2019

// https://github.com/microsoft/typescript-go/issues/1057

export type InputOp = { op: "add" } | { op: "remove"; value?: Array<unknown> };
export type OutputOp = { op: "add" | "remove" };

export function f(operations: InputOp[]): OutputOp[] {
    return operations.flatMap((operation) => {
        if (operation.op === "remove" && operation.value) {
            return [].map(() => ({ op: "remove" }));
        } else {
            return [operation];
        }
    });
}
