// @strict: true
// @noEmit: true

// Deferring constraint validation during overload resolution is not safe when the
// constraint is the only thing distinguishing the overloads. { bad: number } does not
// satisfy Record<string, Schema<any>>, so the second signature must be selected and the
// first must contribute no error.

interface Schema<O> { readonly out: O; }

declare function object<S extends Record<string, Schema<any>>>(shape: S): { tag: "strict" };
declare function object<S extends Record<string, unknown>>(shape: S): { tag: "loose" };

const tree = object({
    get bad() { return 42; },
});

const which: "loose" = tree.tag;

export {};
