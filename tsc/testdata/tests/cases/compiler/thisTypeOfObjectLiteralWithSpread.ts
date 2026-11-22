// @strict: true
// @noEmit: true

// The 'this' of a getter in an object literal with a spread is the type
// inferred for the whole literal, including the spread's properties (52207).

declare function f<D>(def: D & ThisType<D>): D;
declare const named: { name: string };

f({
    ...named,
    get upper() {
        return this.name.toUpperCase();
    },
});
