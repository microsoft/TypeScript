// Two function parameters are object binding patterns with the same
// property name. Indexing the parameter list with number unions those
// parameter types.

function f({ a }, { a: b }) {}

type Params<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

export type Both = Params<typeof f>[number];

// The parameter types of f1 and f2 differ only in their member symbols.
// An array literal of a value of each keeps one of the two types, and a
// union with the type of p1 shows which one it keeps. The namespaces
// resolve the parameter types in opposite orders.

namespace First {
    declare const p1: Params<typeof f1>[0];
    declare const p2: Params<typeof f2>[0];
    function f1({ a }) {}
    function f2({ a: b }) {}
    const arr = [p1, p2];
    declare const u: typeof arr[number] | typeof p1;
}

namespace Second {
    declare const p2: Params<typeof f2>[0];
    declare const p1: Params<typeof f1>[0];
    function f1({ a }) {}
    function f2({ a: b }) {}
    const arr = [p1, p2];
    declare const u: typeof arr[number] | typeof p1;
}
