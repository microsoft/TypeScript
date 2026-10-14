// @strict: true
// @noEmit: true

// Each tuple base can have a different target, and so a different member layout.

type Prefixed<T extends unknown[]> = [number, ...T];
interface FromTuple<T extends unknown[]> extends Prefixed<T> {}
declare const generic: FromTuple<unknown[]>;
const genericFirst = generic[0];
const genericAll = { ...generic };
declare const fixed: FromTuple<[string]>;
const fixedSecond = fixed[1];
const fixedAll = { ...fixed };

