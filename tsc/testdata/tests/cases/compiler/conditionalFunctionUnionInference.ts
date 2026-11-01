// @strict: true
// @target: es2015
// @noEmit: true

type DeepValue<T> = T extends () => unknown ? T :
    { [K in keyof T]: DeepValue<T[K]> };

declare function createValue<T>(initialValue: DeepValue<T | (() => T)>): T;

const value = createValue(() => ({ ready: true }));
value.ready;
