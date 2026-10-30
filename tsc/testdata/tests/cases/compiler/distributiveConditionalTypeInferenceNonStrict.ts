// @strict: false
// @noEmit: true

type InferredParameter<T> = T extends (value: infer P) => unknown ? T | P : never;

function inference<T extends (value: unknown) => unknown>(value: T) {
    const result: InferredParameter<T> = value; // Error: bivariant constraints admit narrower parameters.
}

declare const overloaded: {
    (value: string): void;
    (left: number, right: number): void;
};
const constraint: (value: unknown) => unknown = overloaded;
const rejected: InferredParameter<typeof overloaded> = overloaded; // Error
