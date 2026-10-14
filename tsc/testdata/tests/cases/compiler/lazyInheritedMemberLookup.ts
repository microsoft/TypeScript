// @strict: true
// @noEmit: true

// Inherited members are looked up individually before the members of each type are enumerated.

interface Grand<T> {
    grand: T;
    shared: T;
}
type Mixin<T> = { mixin: T };
type Fixed = { fixed: string };
interface Base<T> extends Grand<T[]> {
    base: T;
}
interface Derived<T> extends Base<T>, Mixin<T>, Fixed {
    shared: T[];
    derived: T;
}
class C<T> {
    declared!: T;
}
class D<T> extends C<T[]> implements Derived<T> {
    grand!: T[];
    shared!: T[];
    mixin!: T;
    fixed!: string;
    base!: T;
    derived!: T;
}

declare const d: Derived<number>;
const grand = d.grand;
const mixin = d.mixin;
const fixed = d.fixed;
const shared = d.shared;
const all = { ...d };
declare const keys: { [K in keyof Derived<boolean>]: K };

declare const e: D<string>;
const declared = e.declared;
const allE = { ...e };
